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

// agenda routes
app.use("/agendas", agendasRoute);

//root route
app.get("/", (req, res) => {
  res.send("Welcome to Agendas API.");
});

// handling other requests (any request which we are not interested in!)
app.get("*", (req, res) => {
  res.status(404).json({message:"404 Not Found."});
});
app.post("*", (req, res) => {
  res.status(404).json({message:"404 Not Found."});
});
app.put("*", (req, res) => {
  res.status(404).json({message:"404 Not Found."});
});
app.delete("*", (req, res) => {
  res.status(404).json({message:"404 Not Found."});
});

app.listen(process.env.PORT || 3500);
