const express = require("express");
const router = express.Router();
const { Appreciation_Books, Teachers } = require("../models");
const { uploadFile } = require("../middlewares/uploadFile");

// Get All Appreciation_Books
router.get("/", async (req, res) => {
  const appreciation_Books = await Appreciation_Books.findAll({
    include: [Teachers],
  });
  if (!appreciation_Books)
    return res.json({ error: "Error, can't fetch appreciation books" });

  if (appreciation_Books.length <= 0)
    return res.json({ error: "There are no appreciation books" });

  return res.json(appreciation_Books);
});

// Get Appreciation_Book by Id
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const appreciation_Book = await Appreciation_Books.findOne({
    where: { id: id },
    include: [Teachers],
  });
  if (!appreciation_Book)
    return res.json({ error: "Error, can't fetch appreciation book" });

  if (appreciation_Book.length <= 0)
    return res.json({ error: "There are no appreciation books" });

  return res.json(appreciation_Book);
});

// Post New Appreciation book
router.post("/", uploadFile.single("image"), async (req, res) => {
  const { name, teacherId } = req.body;
  const image = req.file.filename;

  const appreciation_Book = await Appreciation_Books.findOne({
    where: { name: name, TeacherId: teacherId },
  });
  if (appreciation_Book)
    return res.json({ error: "This appreciation book Already Exist" });

  Appreciation_Books.create({
    name,
    TeacherId: teacherId,
    image: image,
  });

  return res.json({ message: "Appreciation book has been added" });
});

// Update Teacher Row
router.put("/:id", uploadFile.single("image"), async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  const image = req.file.filename;

  const appreciation_Book = await Teachers.findOne({ where: { id: id } });
  if (!appreciation_Book)
    return res.json({ error: "Appreciation book Does Not Exist!" });

  Appreciation_Books.update(
    {
      name,
      image: image
    },
    {
      where: {
        id: id,
      },
    }
  );

  return res.json({ message: "Appreciation book has been Updated" });
});

// Delete Appreciation Book Using Id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const appreciation_Book = await Appreciation_Books.findOne({
    where: { id: id },
  });
  if (!appreciation_Book)
    return res.json({ error: "Appreciation Book Does Not Exist!" });

  Appreciation_Books.destroy({
    where: {
      id: id,
    },
  });

  return res.json({ message: "Appreciation Book has been Deleted" });
});

module.exports = router;
