const express = require("express");
const router = express.Router();
const { Days, Schedules } = require("../models");

// Get Day by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const day = await Days.findOne({
    where: { id: id },
    include: [Schedules],
  });
  if (!day) return res.json({ error: "Day Does not Exist" });

  if (day) {
    return res.json(day);
  } else {
    return res.json({ error: "No day with such id" });
  }
});

// Post New Day
router.post("/", async (req, res) => {
  const { name } = req.body;

  const day = await Days.findOne({ where: { name: name } });
  if (day) return res.json({ error: "Day Already Exist" });

  Days.create({
    name,
  });

  return res.json({ message: "Day has been created" });
});

module.exports = router;
