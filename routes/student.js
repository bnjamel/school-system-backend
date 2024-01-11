const express = require("express");
const router = express.Router();
const {
  Students,
  Divisions,
  Classes,
  Student_Document,
  Study_Biography,
  Users
} = require("../models");
const { validateToken } = require("../middlewares/userAuth");
const { sign } = require("jsonwebtoken");
const { uploadFile } = require("../middlewares/uploadFile");
const { v4: uuidv4 } = require('uuid');

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
router.post("/", uploadFile.fields([
  { name: "identification_card", maxCount: 1},
  { name: "residence_card", maxCount: 1},
  { name: "image", maxCount: 1},
  { name: "document", maxCount: 1},
]) ,async (req, res) => {
  const {
    name,
    birthdate,
    email,
    password,
    location,
    ClassId,
    DivisionId,
    parent,
    phone_number,
    about,
    evaluation,
    gender
  } =
    req.body;
    const identificationCard = req.files["identification_card"] ? req.files["identification_card"][0].filename : "no_image";
    const residenceCard = req.files["residence_card"] ? req.files["residence_card"][0].filename : "no_image";
    const image = req.files["image"] ? req.files["image"][0].filename: "no_image";
    const DocumentImage = req.files["document"] ? req.files["document"][0].filename: "no_document";


  const student = await Students.findOne({ where: { email: email } });
  if (student) return res.json({ error: "student Already Exist" });

  Students.create({
    name: name,
    birthdate: birthdate,
    email: email,
    location: location,
    role: "student",
    password, about, evaluation,
    ClassId,
    DivisionId,
    gender: gender,
    phone_number: phone_number,
    image: image,
    residence_card: residenceCard,
    identification_card: identificationCard,
    student_document_image: DocumentImage,
    parent: parent
  });

  Users.create({
    name,
    email,
    role: "student",
  })

  return res.json({ message: "Student has been Added" });
});

// Post New Student
router.post("/acceptrequest", async (req, res) => {
  const {
    name,birthdate,email,password,location,ClassId,DivisionId,parent,phone_number,about,evaluation,gender,identification_card,residence_card,image,document
  } = req.body;

    console.log(
        name,
        birthdate,
        email,
        password,
        location,
        ClassId,
        DivisionId,
        parent,
        phone_number,
        about,
        evaluation,
        gender,
        identification_card,
        residence_card,
        image,
        document
      )

  const student = await Students.findOne({ where: { email: email } });
  if (student) return res.json({ error: "student Already Exist" });

  Students.create({
    name: name,
    birthdate: birthdate,
    email: email,
    location: location,
    role: "student",
    password, about, evaluation,
    ClassId,
    DivisionId,
    gender: gender,
    phone_number: phone_number,
    image: image,
    residence_card: residence_card,
    identification_card: identification_card,
    student_document_image: document,
    parent: parent
  });

  Users.create({
    name,
    email,
    role: "student",
  })

  return res.json({ message: "Student has been Added" });
});

// Update Student document
router.put("/updateDoc/:id", uploadFile.single("document"), async (req, res) => {
    const id = req.params.id;
    const document = req.file.filename;

    const student = await Students.findOne({ where: { id: id } });
    if (!student) return res.json({ error: "Student Does not exist!" });

    Students.update({
      student_document_image: document
    },
    {
      where: {
        id: id,
      },
    })

});

// Update Student Row
router.put("/:id", uploadFile.single("image"), async (req, res) => {
  const id = req.params.id;
  const { name, birthdate, email, password, location, classId, divisionId, phone_number, about, evaluation, gender, parent } =
    req.body;
    const image = req.file.filename;


  const student = await Students.findOne({ where: { id: id } });
  if (!student) return res.json({ error: "Student Does not exist!" });

  Students.update(
    {
      name,
      birthdate,
      email,
      password,
      location,
      ClassId: classId,
      DivisionId: divisionId,
      image: image,
      phone_number,
      about,
      evaluation,
      gender,
      parent
    },
    {
      where: {
        id: id,
      },
    }
  );

  Users.update({
    name: name,
    email: email
  },
  {
    where: {
      email: student.email,
    },
  })

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
