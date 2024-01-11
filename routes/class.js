const express = require("express");
const router = express.Router();
const { Classes, Divisions, Students } = require("../models");

// Get All Classes
router.get("/", async (req, res) => {
  const classes = await Classes.findAll({
    include: [Divisions, Students],
  });
  if (!classes) return res.json({ error: "Error, can't fetch Classes" });
  if (classes.length <= 0) return res.json({ error: "There are no classes" });
  return res.json(classes);
});

// Get Class by Name
router.get("/:name", async (req, res) => {
  const name = req.params.name;

  const class_ = await Classes.findOne({
    where: { name: name },
    include: [Divisions, Students],
  });
  if (class_) {
    return res.json(class_);
  } else {
    return res.json({ error: "No class with such name" });
  }
});

// Get Class by Id
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;

  const class_ = await Classes.findOne({
    where: { id: id },
    include: [Divisions],
  });
  if (class_) {
    return res.json(class_);
  } else {
    return res.json({ error: "No class with such id" });
  }
});

// Post New Class
router.post("/", async (req, res) => {
  const { name } = req.body;

  const class_ = await Classes.findOne({ where: { name: name } });
  if (class_) return res.json({ error: "Class Already Exist" });

  Classes.create({
    name,
  });

  return res.json({ message: "Class has been created" });
});

// Update Class Row
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  const class_ = await Classes.findOne({ where: { id: id } });
  if (!class_) return res.json({ error: "Class Does Not Exist!" });

  Classes.update(
    {
      name,
    },
    {
      where: {
        id: id,
      },
    }
  );

  return res.json({ message: "Class has been Updated" });
});

// Delete Class Using Id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const class_ = await Classes.findOne({ where: { id: id } });
  if (!class_) return res.json({ error: "Class Does Not Exist!" });

  Classes.destroy({
    where: {
      id: id,
    },
  });

  return res.json({ message: "Class has been Deleted" });
});

module.exports = router;
