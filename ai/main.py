import pandas as pd
import numpy as np
from tensorflow.keras.models import load_model
from sklearn.preprocessing import MinMaxScaler, LabelEncoder
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin


# Khoi tao Flask Server Backend
app = Flask(__name__)

# Apply Flask CORS
CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"

model = load_model("./model/lstm_job_postings_model.keras")

# Load and prepare the encoders and scaler
data = pd.read_csv("./dataset/job_postings_dataset.csv")
data["time"] = pd.to_datetime(data["time"], unit="ms")
data["month"] = data["time"].dt.to_period("M")
aggregated_data = (data.groupby(["job", "city", "month"]).size().reset_index(name="job_postings_count"))

scaler = MinMaxScaler(feature_range=(0, 1))
aggregated_data["job_postings_count_scaled"] = scaler.fit_transform(aggregated_data["job_postings_count"].values.reshape(-1, 1))

job_encoder = LabelEncoder()
city_encoder = LabelEncoder()
job_encoder.fit(aggregated_data["job"])
city_encoder.fit(aggregated_data["city"])


def historical_job_posting_count():
    df = data.groupby(["city", "month"]).size().reset_index(name="job_postings_count")
    df["month"] = df["month"].astype(str)

    # Create a list of cities to iterate through
    cities = df["city"].unique()
    data_list = []
    print(cities)

    # Loop through each city and append data to the response list
    for city in cities:
        city_df = df[df["city"] == city]
        city_data = {
            "city": city,
            "values": city_df["job_postings_count"].tolist(),
        }
        data_list.append(city_data)

    response = {
        "labels": df[df["city"] == "Đà Nẵng"]["month"].tolist(),
        "data": data_list,
    }
    return response


def predict_future(job, city, time_step=12, future_periods=12):
    job_encoded = job_encoder.transform([job])[0]
    city_encoded = city_encoder.transform([city])[0]

    # Fetch historical data
    historical_data = aggregated_data[
        (aggregated_data["job"] == job) & (aggregated_data["city"] == city)
    ]
    historical_counts = historical_data["job_postings_count"].values.tolist()

    # Fetch the last time_step data for prediction
    x_input = historical_data["job_postings_count_scaled"].values[-time_step:]
    x_input = np.array(
        [np.append([job_encoded, city_encoded], x) for x in x_input.reshape(-1, 1)]
    )

    temp_input = x_input.tolist()
    lst_output = []

    for i in range(future_periods):
        if len(temp_input) > time_step:
            x_input = np.array(temp_input[-time_step:])
            x_input = x_input.reshape(1, time_step, 3)
            yhat = model.predict(x_input, verbose=0)
            next_input = [job_encoded, city_encoded, yhat[0][0]]
            temp_input.append(next_input)
            lst_output.append(yhat[0][0])
        else:
            x_input = np.array(temp_input)
            x_input = x_input.reshape(1, len(temp_input), 3)
            yhat = model.predict(x_input, verbose=0)
            next_input = [job_encoded, city_encoded, yhat[0][0]]
            temp_input.append(next_input)
            lst_output.append(yhat[0][0])

    future_predict = (
        scaler.inverse_transform(np.array(lst_output).reshape(-1, 1)).flatten().tolist()
    )

    # Floor the predictions
    future_predict = np.floor(future_predict).astype(int).tolist()

    return historical_counts, future_predict


@app.route("/ai/api/v1/job_history", methods=["GET"])
@cross_origin()
def historical_job():
    try:
        historical_counts = historical_job_posting_count()

        return jsonify(historical_counts)
    except:
        return {"code": 500, "message": "Internal server error"}, 500


@app.route("/ai/api/v1/job_future", methods=["POST"])
@cross_origin()
def predict_job():
    try:
        data = request.get_json()
        job = data["job"]
        city = data["city"]
        future_periods = data.get("future_periods", 12)

        historical_counts, prediction = predict_future(
            job, city, future_periods=future_periods
        )

        return jsonify(historical=historical_counts, prediction=prediction)
    except:
        return {"code": 500, "message": "Internal server error"}, 500


@app.route("/whoami", methods=["GET"])
@cross_origin()
def whoami():
    return "AI SERVER"


# Start Backend
if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5001", debug=True)
