const express = require("express");
const router = express.Router();
const { Study_Biography } = require("../models");

// Get Document by Id
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;

  const biography = await Study_Biography.findOne({
    where: { StudentId: id },
  });
  if (biography) {
    return res.json(biography);
  } else {
    return res.json({ error: "There is no biography for this student" });
  }
});

// Post New Document
router.post("/", async (req, res) => {
  const { about, evaluation, StudentId } = req.body;

  const biography = await Study_Biography.findOne({
    where: { StudentId: StudentId },
  });
  if (biography)
    return res.json({ error: "This student already has biography" });

  Study_Biography.create({
    about,
    evaluation,
    StudentId,
  });

  return res.json({ message: "biography has been Added" });
});

// Update Document Row
router.put("/:id", async (req, res) => {
  const { about, evaluation, StudentId } = req.body;

  const biography = await Study_Biography.findOne({
    where: { StudentId: StudentId },
  });
  if (!biography) return res.json({ error: "biography Does Not Exist!" });

  Study_Biography.update(
    {
      about,
      evaluation,
    },
    {
      where: {
        StudentId: StudentId,
      },
    }
  );

  return res.json({ message: "biography has been Updated" });
});

// Delete Document Using Id
// router.delete("/:id", async (req, res) => {
//   const id = req.params.id;

//   const student = await Students.findOne({ where: { id: id } });
//   if (!student) return res.json({ error: "Student Does Not Exist!" });

//   Students.destroy({
//     where: {
//       id: id,
//     },
//   });

//   return res.json({ message: "Student has been Deleted" });
// });

module.exports = router;
