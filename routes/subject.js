const express = require("express");
const router = express.Router();
const { Subjects } = require("../models");

// Get All Subjects
router.get("/", async (req, res) => {
  const subjects = await Subjects.findAll();
  if (!subjects) return res.json({ error: "Error, can't fetch subjects" });

  if (subjects.length <= 0) return res.json({ error: "There are no subjects" });

  return res.json(subjects);
});

// Get All Subjects
router.get("/:id", async (req, res) => {
  const id = req.params.id;
 
  const subject = await Subjects.findOne({where: {id: id}});
  if (!subject) return res.json({ error: "Error, can't fetch subject" });

  if (subject.length <= 0) return res.json({ error: "There are no subject" });

  return res.json(subject);
});

// Post Subject
router.post("/", async (req, res) => {
  const { name } = req.body;

  const subject = await Subjects.findOne({ where: { name: name } });
  if (subject) return res.json({ error: "Subject Already Exist" });

  Subjects.create({
    name: name,
  });

  return res.json({ message: "Subject Added" });
});

module.exports = router;
