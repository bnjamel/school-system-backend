const express = require("express");
const router = express.Router();
const { Student_Document } = require("../models");
const { uploadFile } = require("../middlewares/uploadFile");

// Get Document by Id
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;

  const document = await Student_Document.findOne({
    where: { StudentId: id },
  });
  if (document) {
    return res.json(document);
  } else {
    return res.json({ error: "There is no document for this student" });
  }
});

// Post New Document
router.post("/", uploadFile.single("image"), async (req, res) => {
  const { name, StudentId } = req.body;
  const image = req.file.filename;

  const document = await Student_Document.findOne({
    where: { StudentId: StudentId },
  });
  if (document) return res.json({ error: "This student already has document" });

  Student_Document.create({
    name,
    StudentId,
    image: image,
  });

  return res.json({ message: "Document has been Added" });
});

// Update Document Row
router.put("/:id", async (req, res) => {
  const { name, StudentId } = req.body;

  const document = await Student_Document.findOne({
    where: { StudentId: StudentId },
  });
  if (!document) return res.json({ error: "document Does Not Exist!" });

  Student_Document.update(
    {
      name,
    },
    {
      where: {
        StudentId: StudentId,
      },
    }
  );

  return res.json({ message: "document has been Updated" });
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
