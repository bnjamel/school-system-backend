const express = require("express");
const router = express.Router();
const { Admins } = require("../models");

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

// Post New Admin
router.post("/", async (req, res) => {
  const { name, age, degree, experience, email, password, location } = req.body;

  const admin = await Admins.findOne({ where: { email: email } });
  if (admin) return res.json({ error: "Admin Already Exist" });

  Admins.create({
    name,
    age,
    degree,
    experience,
    email,
    password,
    location,
    role: "admin",
  });

  return res.json({ message: "Admin has been Added" });
});

// Update Admin Row
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, age, degree, experience, email, password, location } = req.body;

  const admin = await Admins.findOne({ where: { id: id } });
  if (!admin) return res.json({ error: "Admin Does Not Exist!" });

  Admins.update(
    {
      name,
      age,
      degree,
      experience,
      email,
      password,
      location,
      role: "admin",
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

module.exports = router;
