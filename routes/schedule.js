const express = require("express");
const router = express.Router();
const { Divisions, Students, Classes, Days, Schedules } = require("../models");

// Get Schedule by id
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const schedule = await Schedules.findOne({
    where: { id: id },
    include: [Days],
  });
  if (!schedule) return res.json({ error: "Schedule Does not Exist" });

  if (schedule) {
    return res.json(schedule);
  } else {
    return res.json({ error: "No schedule with such id" });
  }
});

// Get Schedule by division id
router.get("/byDivId/:id", async (req, res) => {
  const id = req.params.id;

  const schedule = await Schedules.findAll({
    where: { DivisionId: id },
    include: [Days, Divisions],
  });
  if (!schedule) return res.json({ error: "Schedule Does not Exist" });

  if (schedule) {
    return res.json(schedule);
  } else {
    return res.json({ error: "No schedule with such id" });
  }
});

// Post New Schedule
router.post("/", async (req, res) => {
  const {
    first_lesson,
    second_lesson,
    third_lesson,
    fourth_lesson,
    fifth_lesson,
    sixth_lesson,
    dayId,
    divisionId,
  } = req.body;

  const schedule = await Schedules.findOne({
    where: {
      first_lesson,
      second_lesson,
      third_lesson,
      fourth_lesson,
      fifth_lesson,
      sixth_lesson,
      dayId,
      DivisionId: divisionId,
    },
  });
  if (schedule) return res.json({ error: "schedule Already Exist" });

  Schedules.create({
    first_lesson,
    second_lesson,
    third_lesson,
    fourth_lesson,
    fifth_lesson,
    sixth_lesson,
    DayId: dayId,
    DivisionId: divisionId,
  });

  return res.json({ message: "Day has been created" });
});

// Update Division Row
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const {
    first_lesson,
    second_lesson,
    third_lesson,
    fourth_lesson,
    fifth_lesson,
    sixth_lesson,
  } = req.body;

  const schedule = await Schedules.findOne({ where: { id: id } });
  if (!schedule) return res.json({ error: "schedule Does Not Exist!" });

  Schedules.update(
    {
      first_lesson,
      second_lesson,
      third_lesson,
      fourth_lesson,
      fifth_lesson,
      sixth_lesson,
    },
    {
      where: {
        id: id,
      },
    }
  );

  return res.json({ message: "Schedule has been Updated" });
});

module.exports = router;
