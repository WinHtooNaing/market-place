const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();

const storageConfigure = multer.diskStorage({
  filename: (req, file, cb) => {
    const suffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, suffix + "-" + file.originalname);
  },
});
const filterConfigure = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, undefined);
  }
};

const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(
  multer({ storage: storageConfigure, fileFilter: filterConfigure }).array(
    "images"
  )
);

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
