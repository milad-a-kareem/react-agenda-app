const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Agenda",
  new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    dateTime: { type: Date, required: true },
  })
);
