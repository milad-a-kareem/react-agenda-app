const express = require("express");
// const sanitizer = require("sanitize")();
const router = express.Router();

// models
const Agendas = require("../models/agenda-model");

router.get("/", async (req, res) => {
  const agendas = await Agendas.find({});

  res.status(200).json({ agendas });
});

router.put("/", async (req, res) => {
  const agendas = await Agendas.updateMany({});

  res.status(200).json({ agendas });
});

router.delete("/", async (req, res) => {
  const deleteAll = await Agendas.removeAll();

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
  const dateTime = req.body.dateTime;

  const newAgenda = await Agendas.create({
    title,
    description,
    status,
    dateTime,
  });

  res.status(200).json({ newAgenda });
});

router.get("/:agendaId", async (req, res) => {
  const agenda = await Agendas.findById(req.params.agendaId);

  res.status(200).json({ agenda });
});

router.put("/:agendaId", async (req, res) => {
  const agenda = await Agendas.findById({});

  res.status(200).json({ accounts: accounts });
});

router.delete("/:agendaId", async (req, res) => {
  const agenda = await Agendas.findById({});

  res.status(200).json({ accounts: accounts });
});

module.exports = router;
