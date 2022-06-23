const express = require("express");
// const sanitizer = require("sanitize")();
const router = express.Router();
const multer = require("multer");
const path = require("path");
const del = require("del");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage });

// models
const Agendas = require("../models/agenda-model");

router.get("/", async (req, res) => {
  const agendas = await Agendas.find({});

  res.status(200).json({ agendas });
});

router.delete("/", async (req, res) => {
  const deleteAll = await Agendas.deleteMany({});

  res.status(200).json({ message: "All agendas removed." });
});

router.post("/add", async (req, res) => {
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.status ||
    !req.body.dateTime
  ) {
    return res.status(400).json({ message: "Bad request" });
  }
  const title = req.body.title;
  const description = req.body.description;
  const status = req.body.status;
  const dateTime = new Date(req.body.dateTime);

  const newAgenda = await Agendas.create({
    title,
    description,
    status,
    dateTime,
  });

  res.status(200).json({ newAgenda });
});

router.post("/import", upload.single("file"), async (req, res) => {
  const csv = require("csv-parser");
  const fs = require("fs");
  const results = [];
  await new Promise((resolve, reject) => {
    fs.createReadStream(path.join("uploads", req.file.filename))
      .pipe(
        csv({
          mapHeaders: ({ header, index }) =>
            header === "Date and Time" ? "dateTime" : header.toLowerCase(),
          mapValues: ({ header, index, value }) =>
            index === 3 ? new Date(value) : value,
        })
      )
      .on("data", (data) => results.push(data))
      .on("end", () => {
        del([path.join("uploads", req.file.filename)]);
        resolve(results);
      });
  });
  const importedAgendas = await Agendas.insertMany(results);

  res.status(200).json({ importedAgendas });
});

router.get("/export", async (req, res) => {
  await exportData();
  const file = `./agendas.csv`;
  res.download(file);
});

router.get("/:agendaId", async (req, res) => {
  try {
    const agenda = await Agendas.findById(req.params.agendaId);
    res.status(200).json({ agenda });
  } catch (error) {
    return res.status(404).json({ message: "Agenda not found." });
  }
});

router.put("/:agendaId", async (req, res) => {
  try {
    const agenda = await Agendas.findById(req.params.agendaId);
    if (
      !req.body.title &&
      !req.body.description &&
      !req.body.status &&
      !req.body.dateTime
    ) {
      return res.status(400).json({ message: "Bad request" });
    }
    agenda.title = req.body.title || agenda.title;
    agenda.description = req.body.description || agenda.description;
    agenda.status = req.body.status || agenda.status;
    agenda.dateTime =
      (req.body.dateTime ? new Date(req.body.dateTime) : false) ||
      agenda.dateTime;
    const updatedAgenda = await agenda.save();
    res.status(200).json({ newAgenda: updatedAgenda });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "Agenda not found." });
  }
});

router.delete("/:agendaId", async (req, res) => {
  try {
    await Agendas.findByIdAndDelete(req.params.agendaId);
    res.status(200).json({ message: "Agenda deleted." });
  } catch (error) {
    return res.status(404).json({ message: "Agenda not found" });
  }
});

const exportData = async () => {
  const createCsvWriter = require("csv-writer").createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: "./agendas.csv",
    header: [
      { id: "title", title: "Title" },
      { id: "description", title: "Description" },
      { id: "status", title: "Status" },
      { id: "dateTime", title: "Date and Time" },
    ],
  });

  const records = await Agendas.find({});
  await csvWriter.writeRecords(records);
};

module.exports = router;
