import random
import time

# Helper function to generate random timestamps between two dates
def random_timestamp(start_year, end_year):
    start = int(time.mktime(time.strptime(f"01/01/{start_year}", "%d/%m/%Y")))
    end = int(time.mktime(time.strptime(f"31/12/{end_year}", "%d/%m/%Y")))
    return random.randint(start, end) * 1000

# Possible values for the fields
locations = ["Hồ Chí Minh", "Đà Nẵng", "Hà Nội"]
positions = [
    "Backend Developer", "Frontend Developer", "Data Scientist", "NodeJs",
    "Java Developer", "DevOps Engineer", "Python Developer", "ReactJs"
]
seniority_levels = ["intern", "fresher", "junior", "middle", "senior"]

# Generate 500 rows of data
data = []
start_id = 10001
num_rows = 50000

for i in range(num_rows):
    row = [
        start_id + i,  # ID
        random_timestamp(2023, 2024),  # Random timestamp
        random.choice(locations),  # Random location
        random.choice(positions),  # Random position
        random.randint(1, 10),  # Employee count
        "Công nghệ thông tin",  # Industry
        random.choice(seniority_levels)  # Random seniority
    ]
    data.append(row)

# Convert to formatted string for output
output = "\n".join([",".join(map(str, row)) for row in data])

file_path = "./dataset/generated_data.csv"
with open(file_path, "w", encoding="utf-8") as file:
    file.write(output)
