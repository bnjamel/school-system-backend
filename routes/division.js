const express = require("express");
const router = express.Router();
const { Divisions, Students, Classes, Schedules } = require("../models");

// Get All Divisions
router.get("/", async (req, res) => {
  const divisions = await Divisions.findAll({
    include: [Students, Classes, Schedules],
  });
  if (!divisions) return res.json({ error: "Error, can't fetch divisions" });

  if (divisions.length <= 0)
    return res.json({ error: "There are no divisions" });

  return res.json(divisions);
});

// Get Division by Name
router.get("/:classId/:id", async (req, res) => {
  const id = req.params.id;
  const classId = req.params.classId;

  const division = await Divisions.findOne({
    where: { id: id, ClassId: classId },
    include: [Students, Classes, Schedules],
  });
  if (division) {
    return res.json(division);
  } else {
    return res.json({ error: "No division with such name" });
  }
});

// Post New Division
router.post("/", async (req, res) => {
  const { name, classId } = req.body;

  const division = await Divisions.findOne({
    where: { name: name, ClassId: classId },
  });
  if (division) return res.json({ error: "This Division Already Exist" });

  Divisions.create({
    name,
    ClassId: classId,
  });

  return res.json({ message: "Division has been created" });
});

// Update Division Row
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  const division = await Divisions.findOne({ where: { id: id } });
  if (!division) return res.json({ error: "Division Does Not Exist!" });

  Divisions.update(
    {
      name,
    },
    {
      where: {
        id: id,
      },
    }
  );

  return res.json({ message: "Division has been Updated" });
});

// Delete Division Using Id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const division = await Divisions.findOne({ where: { id: id } });
  if (!division) return res.json({ error: "Division Does Not Exist!" });

  Divisions.destroy({
    where: {
      id: id,
    },
  });

  return res.json({ message: "Division has been Deleted" });
});

module.exports = router;
