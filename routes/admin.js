const express = require("express");
const router = express.Router();
const { Admins } = require("../models");
const { validateToken } = require("../middlewares/userAuth");
const { sign } = require("jsonwebtoken");
const { uploadFile } = require("../middlewares/uploadFile");

// Get All Admins
router.get("/", async (req, res) => {
  const admins = await Admins.findAll();
  if (!admins) return res.json({ error: "Error, can't fetch admins" });

  if (admins.length <= 0) return res.json({ error: "There are no admins" });

  return res.json(admins);
});

// Get Admin by Name
router.get("/:name", async (req, res) => {
  const name = req.params.name;

  const admin = await Admins.findOne({
    where: { name: name },
  });
  if (admin) {
    return res.json(admin);
  } else {
    return res.json({ error: "No admin with such name" });
  }
});

// Get Admin by Id
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;

  const admin = await Admins.findOne({
    where: { id: id },
  });
  if (admin) {
    return res.json(admin);
  } else {
    return res.json({ error: "No admin with such id" });
  }
});

// Admin Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admins.findOne({ where: { email: email } });
    if (!admin) return res.json({ error: "No Such admin" });

    if (password === admin.password) {
      const accessToken = sign(
        {
          email: admin.email,
          fullName: admin.name,
          id: admin.id,
          role: admin.role,
        },
        "secretkey"
      );
      return res.json({
        token: accessToken,
        email: email,
        fullName: admin.name,
        id: admin.id,
        role: admin.role,
      });
    } else {
      return res.json({ error: "Wrong E-mail or Password" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Post New Admin
router.post("/", uploadFile.single("image"), async (req, res) => {
  const { name, birthdate, degree, experience, email, password, location, phone_number } =
    req.body;
  const image = req.file.filename;

  const admin = await Admins.findOne({ where: { email: email } });
  if (admin) return res.json({ error: "Admin Already Exist" });

  Admins.create({
    name,
    birthdate,
    degree,
    experience,
    email,
    password,
    location,
    role: "admin",
    image: image,
    phone_number
  });

  return res.json({ message: "Admin has been Added" });
});

// Update Admin Row
router.put("/:id", uploadFile.single("image"), async (req, res) => {
  const id = req.params.id;
  const { name, birthdate, degree, experience, email, password, location, phone_number } =
    req.body;
    const image = req.file.filename;

  const admin = await Admins.findOne({ where: { id: id } });
  if (!admin) return res.json({ error: "Admin Does Not Exist!" });

  Admins.update(
    {
      name,
      birthdate,
      degree,
      experience,
      email,
      password,
      location,
      role: "admin",
      image: image,
      phone_number
    },
    {
      where: {
        id: id,
      },
    }
  );

  return res.json({ message: "Admin has been Updated" });
});

// Delete Admin Using Id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const admin = await Admins.findOne({ where: { id: id } });
  if (!admin) return res.json({ error: "Admin Does Not Exist!" });

  Admins.destroy({
    where: {
      id: id,
    },
  });

  return res.json({ message: "Admin has been Deleted" });
});

router.get("/authToken", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
