const knex = require("knex");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes/v1");
const ApiError = require("./utils/ApiError");
const httpStatus = require("http-status");
const { errorConverter, errorHandler } = require("./middlewares/error");
const app = express();
const cloudinary = require("cloudinary");
const bodyParser = require("body-parser");
const config = require("./config");
const { cronJob } = require("./schedule")

app.use(bodyParser.json());
// parse json request body
app.use(express.json({ limit: '50mb' }));
// parse urlencoded request body
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({ origin: "*" }));

cloudinary.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

app.use("/", (req, res) => {
  res.send("CAPSTONE PROJECT - THANHHV!");
});

// v1 api routes
app.use("/api/v1", routes);

// start cronJob sendMail
cronJob.start();

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

const port = 3001;
const ip = "0.0.0.0";
app.listen(port, ip, function () {
  console.log(`Example app listening on port ${port}`);
});
