const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(authRoute);
app.use(productRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(8080);
    console.log("database server connected!! ");
  })
  .catch(() => {
    console.log("Database connection failed!!");
  });
