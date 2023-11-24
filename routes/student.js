const express = require("express");
const router = express.Router();
const {
  Students,
  Divisions,
  Classes,
  Student_Document,
  Study_Biography,
} = require("../models");
const { validateToken } = require("../middlewares/userAuth");
const { sign } = require("jsonwebtoken");
const { uploadFile } = require("../middlewares/uploadFile");

// Get All Students
router.get("/", async (req, res) => {
  const students = await Students.findAll({
    include: [Divisions, Classes, Student_Document, Study_Biography],
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
    include: [Divisions, Classes, Student_Document, Study_Biography],
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
    include: [Divisions, Classes, Student_Document, Study_Biography],
  });
  if (student) {
    return res.json(student);
  } else {
    return res.json({ error: "No student with such id" });
  }
});

// Student Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Students.findOne({ where: { email: email } });
    if (!student) return res.json({ error: "No Such student" });
    console.log(password, student.password);
    if (password === student.password) {
      const accessToken = sign(
        {
          email: student.email,
          name: student.name,
          id: student.id,
          role: student.role,
        },
        "secretkey"
      );
      return res.json({
        token: accessToken,
        email: email,
        name: student.name,
        id: student.id,
        role: student.role,
      });
    } else {
      return res.json({ error: "Wrong E-mail or Password" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Post New Student
router.post("/", uploadFile.single("image"), async (req, res) => {
  const { name, birthdate, email, password, location, classId, divisionId } =
    req.body;
  const image = req.file.filename;

  const student = await Students.findOne({ where: { email: email } });
  if (student) return res.json({ error: "student Already Exist" });

  Students.create({
    name,
    birthdate,
    email,
    password,
    location,
    role: "student",
    ClassId: classId,
    DivisionId: divisionId,
    image: image,
  });

  return res.json({ message: "Student has been Added" });
});

// Update Student Row
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, birthdate, email, password, location, classId, divisionId } =
    req.body;

  const student = await Students.findOne({ where: { email: email } });
  if (!student) return res.json({ error: "Student Does Not Exist!" });

  Students.update(
    {
      name,
      birthdate,
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

router.get("/authToken", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
