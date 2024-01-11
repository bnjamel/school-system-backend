const express = require("express");
const router = express.Router();
const {
  IsPending
} = require("../models");
const { uploadFile } = require("../middlewares/uploadFile");

// Get All Pending
router.get("/", async (req, res) => {
  const pending = await IsPending.findAll();
  if (!pending) return res.json({ error: "Error, can't fetch pending" });

  if (pending.length <= 0) return res.json({ error: "There are no Pending" });

  return res.json(pending);
});

// Get pending by Name
router.get("/:name", async (req, res) => {
  const name = req.params.name;

  const pending = await IsPending.findOne({
    where: { name: name },
  });
  if (pending) {
    return res.json(pending);
  } else {
    return res.json({ error: "No pending with such name" });
  }
});

// Get Student by Id
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;

  const pending = await IsPending.findOne({
    where: { id: id },
  });
  if (pending) {
    return res.json(pending);
  } else {
    return res.json({ error: "No pending with such id" });
  }
});

// Post New Student
router.post("/", uploadFile.fields([
  {name: "image", maxCount: 1},
  { name: "identification_card", maxCount: 1 },
  { name: "residence_card", maxCount: 1 },
  { name: "student_document_image", maxCount: 1 },
]), async (req, res) => {
  const {
        name, parent, phone_number, student_document_name,gender, about, evaluation, birthdate,
        email, password, location, classId, divisionId
    } =
    req.body;
    const identificationCard = req.files["identification_card"] ? req.files["identification_card"][0].filename : "no_image";
    const residenceCard = req.files["residence_card"] ? req.files["residence_card"][0].filename : "no_image";
    const image = req.files["image"] ? req.files["image"][0].filename: "no_image";
    const DocumentImage = req.files["student_document_image"] ? req.files["student_document_image"][0].filename: "no_image";


  const student = await IsPending.findOne({ where: { email: email } });
  if (student) return res.json({ error: "student Already Exist" });

  IsPending.create({
    name: name,
    birthdate: birthdate,
    email: email,
    location: location,
    role: "pending",
    student_document_name, about, evaluation,
    ClassId: classId,
    DivisionId: divisionId,
    phone_number: phone_number,
    gender,
    image: image,
    residence_card: residenceCard,
    identification_card: identificationCard,
    student_document_image: DocumentImage,
    parent: parent
  });

  return res.json({ message: "سوف يتم إرسال البريد الالكتروني وكلمة المرور اليك تفقد بريدك الالكتروني الذي زودتنا به" });
});

// // Update Student Row
// router.put("/:id", uploadFile.single("image"), async (req, res) => {
//   const id = req.params.id;
//   const { name, birthdate, email, password, location, classId, divisionId, phone_number } =
//     req.body;
//     const image = req.file.filename;


//   const student = await Students.findOne({ where: { email: email } });
//   if (!student) return res.json({ error: "Student Does Not Exist!" });

//   Students.update(
//     {
//       name,
//       birthdate,
//       email,
//       password,
//       location,
//       ClassId: classId,
//       DivisionId: divisionId,
//       image: image,
//       phone_number
//     },
//     {
//       where: {
//         id: id,
//       },
//     }
//   );

//   return res.json({ message: "Student has been Updated" });
// });

// Delete Student Using Id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const student = await IsPending.findOne({ where: { id: id } });
  if (!student) return res.json({ error: "Student Does Not Exist!" });

  IsPending.destroy({
    where: {
      id: id,
    },
  });

  return res.json({ message: "Student has been Deleted" });
});

// router.get("/authToken", validateToken, (req, res) => {
//   res.json(req.user);
// });

module.exports = router;
