const express = require("express");
const router = express.Router();
const { Teachers, Subjects, Appreciation_Books } = require("../models");
const { validateToken } = require("../middlewares/userAuth");
const { sign } = require("jsonwebtoken");
const { uploadFile } = require("../middlewares/uploadFile");
const Users = require("../models/Users");

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

// Teacher Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const teacher = await Teachers.findOne({ where: { email: email } });
    if (!teacher) return res.json({ error: "No Such teacher" });

    if (password === teacher.password) {
      const accessToken = sign(
        {
          email: teacher.email,
          name: teacher.name,
          id: teacher.id,
          role: teacher.role,
        },
        "secretkey"
      );
      return res.json({
        token: accessToken,
        email: email,
        name: teacher.name,
        id: teacher.id,
        role: teacher.role,
      });
    } else {
      return res.json({ error: "Wrong E-mail or Password" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Post New Teacher
router.post("/", uploadFile.single("image"), async (req, res) => {
  const {
    name,
    birthdate,
    degree,
    experience,
    email,
    password,
    location,
    subjectId,
  } = req.body;
  const image = req.file.filename;

  const teacher = await Teachers.findOne({
    where: { email: email },
  });
  if (teacher) return res.json({ error: "teacher Already Exist" });

  Teachers.create({
    name,
    birthdate,
    degree,
    experience,
    email,
    password,
    location,
    role: "teacher",
    SubjectId: subjectId,
    image: image,
  });

  Users.create({
    name,
    email,
    role: "teacher",
  })

  return res.json({ message: "Teacher has been Added" });
});

// Update Teacher Row
router.put("/:id", uploadFile.single("image"), async (req, res) => {
  const id = req.params.id;
  const {
    name,
    birthdate,
    degree,
    experience,
    email,
    password,
    location,
    subjectId,
    role,
  } = req.body;
  const image = req.file.filename;


  const teacher = await Teachers.findOne({ where: { email: email } });
  if (!teacher) return res.json({ error: "Teacher Does Not Exist!" });

  Teachers.update(
    {
      name,
      birthdate,
      degree,
      experience,
      email,
      password,
      location,
      role: role,
      SubjectId: subjectId,
      image: image
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

router.get("/authToken", validateToken, (req, res) => {
  return res.json(req.user);
});

module.exports = router;
