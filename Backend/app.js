const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// environment variables
require("dotenv").config();

// database connection
const dbConnection = require("./utils/db-connection");

// importing routes
const agendasRoute = require("./routes/agendas-route");

// models
const Agendas = require("./models/agenda-model");

// CORS management
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/agendas", agendasRoute);

app.get("/", (req, res) => {
  res.send("Welcome to Agendas API.");
});
app.get("*", (req, res) => {
  res.send("404 Page Not Found.");
});

app.listen(process.env.PORT || 3500);
