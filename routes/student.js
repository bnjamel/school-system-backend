const express = require("express");
const router = express.Router();
const { Students, Divisions, Classes } = require("../models");

// Get All Students
router.get("/", async (req, res) => {
  const students = await Students.findAll({
    include: [Divisions, Classes],
  });
  if (!students) return res.json({ error: "Error, can't fetch students" });

  if (students.length <= 0) return res.json({ error: "There are no students" });

  return res.json(students);
});

// Get Student by Name
router.get("/:name", async (req, res) => {
  const name = req.params.name;

  const student = await Students.findOne({
    where: { name: name },
    include: [Divisions, Classes],
  });
  if (student) {
    return res.json(student);
  } else {
    return res.json({ error: "No student with such name" });
  }
});

// Get Student by Id
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;

  const student = await Students.findOne({
    where: { id: id },
    include: [Divisions, Classes],
  });
  if (student) {
    return res.json(student);
  } else {
    return res.json({ error: "No student with such id" });
  }
});

// Post New Student
router.post("/", async (req, res) => {
  const { name, age, email, password, location, classId, divisionId } =
    req.body;

  const student = await Students.findOne({ where: { email: email } });
  if (student) return res.json({ error: "student Already Exist" });

  Students.create({
    name,
    age,
    email,
    password,
    location,
    role: "student",
    ClassId: classId,
    DivisionId: divisionId,
  });

  return res.json({ message: "Student has been Added" });
});

// Update Student Row
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, age, email, password, location, classId, divisionId } =
    req.body;

  const student = await Students.findOne({ where: { email: email } });
  if (!student) return res.json({ error: "Student Does Not Exist!" });

  Students.update(
    {
      name,
      age,
      email,
      password,
      location,
      ClassId: classId,
      DivisionId: divisionId,
    },
    {
      where: {
        id: id,
      },
    }
  );

  return res.json({ message: "Student has been Updated" });
});

// Delete Student Using Id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const student = await Students.findOne({ where: { id: id } });
  if (!student) return res.json({ error: "Student Does Not Exist!" });

  Students.destroy({
    where: {
      id: id,
    },
  });

  return res.json({ message: "Student has been Deleted" });
});

module.exports = router;
