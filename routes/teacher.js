const express = require("express");
const router = express.Router();
const { Teachers, Subjects, Appreciation_Books } = require("../models");

// Get All Teachers
router.get("/", async (req, res) => {
  const teachers = await Teachers.findAll({
    include: [Subjects, Appreciation_Books],
  });
  if (!teachers) return res.json({ error: "Error, can't fetch teachers" });

  if (teachers.length <= 0) return res.json({ error: "There are no teachers" });

  return res.json(teachers);
});

// Get Teacher by Name
router.get("/:name", async (req, res) => {
  const name = req.params.name;

  const teacher = await Teachers.findOne({
    where: { name: name },
    include: [Subjects, Appreciation_Books],
  });
  if (teacher) {
    return res.json(teacher);
  } else {
    return res.json({ error: "No teacher with such name" });
  }
});

// Get Teacher by Id
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;

  const teacher = await Teachers.findOne({
    where: { id: id },
    include: [Subjects, Appreciation_Books],
  });
  if (teacher) {
    return res.json(teacher);
  } else {
    return res.json({ error: "No teacher with such id" });
  }
});

// Post New Teacher
router.post("/", async (req, res) => {
  const {
    name,
    age,
    degree,
    experience,
    email,
    password,
    location,
    subjectId,
  } = req.body;

  const teacher = await Teachers.findOne({
    where: { email: email },
  });
  if (teacher) return res.json({ error: "teacher Already Exist" });

  Teachers.create({
    name,
    age,
    degree,
    experience,
    email,
    password,
    location,
    role: "teacher",
    SubjectId: subjectId,
  });

  return res.json({ message: "Teacher has been Added" });
});

// Update Teacher Row
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const {
    name,
    age,
    degree,
    experience,
    email,
    password,
    location,
    subjectId,
    role,
  } = req.body;

  const teacher = await Teachers.findOne({ where: { email: email } });
  if (!teacher) return res.json({ error: "Teacher Does Not Exist!" });

  Teachers.update(
    {
      name,
      age,
      degree,
      experience,
      email,
      password,
      location,
      role: role,
      SubjectId: subjectId,
    },
    {
      where: {
        id: id,
      },
    }
  );

  return res.json({ message: "Teacher has been Updated" });
});

// Delete Teacher Using Id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const teacher = await Teachers.findOne({ where: { id: id } });
  if (!teacher) return res.json({ error: "Teacher Does Not Exist!" });

  Teachers.destroy({
    where: {
      id: id,
    },
  });

  return res.json({ message: "Teacher has been Deleted" });
});

module.exports = router;
