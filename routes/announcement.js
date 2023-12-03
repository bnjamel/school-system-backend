const express = require("express");
const router = express.Router();
const { Announcements, Users } = require("../models");
const { uploadFile } = require("../middlewares/uploadFile");

// Get All Announcements
router.get("/", async (req, res) => {
  const announcements = await Announcements.findAll({
    include: [Users],
    order: [['createdAt', 'ASC']]
  });
  if (!announcements) return res.json({ error: "Error, can't fetch announcements" });

  if (announcements.length <= 0) return res.json({ error: "There are no announcements" });

  return res.json(announcements);
});

// Get Announcements by title
router.get("/:title", async (req, res) => {
  const title = req.params.title;

  const announcement = await Announcements.findOne({
    where: { title: title },
    include: [Users],
  });
  if (announcement) {
    return res.json(announcement);
  } else {
    return res.json({ error: "No announcement with such title" });
  }
});

// Get Announcements by type
router.get("/byType/:type", async (req, res) => {
  const type = req.params.type;

  const announcement = await Announcements.findAll({
    where: { type: type },
    include: [Users],
    order: [['createdAt', 'ASC']]
  });
  if (announcement) {
    return res.json(announcement);
  } else {
    return res.json({ error: "No announcement with such type" });
  }
});

// Get Announcements by Id
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;

  const announcement = await Announcements.findOne({
    where: { id: id },
    include: [Users],
  });
  if (announcement) {
    return res.json(announcement);
  } else {
    return res.json({ error: "No announcement with such id" });
  }
});

// Post New Announcements
router.post("/", uploadFile.single("image"), async (req, res) => {
  const { title, body, date, type, UserId } = req.body;
  const image = req.file.filename;

  Announcements.create({
    cover: image,
    title: title,
    body: body,
    date: date,
    type: type,
    UserId: UserId
  });

  return res.json({ message: "Announcement has been Added" });
});

// Update Announcement Row
router.put("/:id", uploadFile.single("image"), async (req, res) => {
  const id = req.params.id;
  const { title, body, date, type, userId } = req.body;
  const image = req.file.filename;

  const announcement = await Admins.findOne({ where: { id: id } });
  if (!announcement) return res.json({ error: "Announcement Does Not Exist!" });

  Announcements.update(
    {
        cover: image,
        title: title,
        body: body,
        date: date,
        type: type,
        UserId: userId
    },
    {
      where: {
        id: id,
      },
    }
  );

  return res.json({ message: "Admin has been Updated" });
});

// Delete Announcement Using Id
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const announcement = await Admins.findOne({ where: { id: id } });
  if (!announcement) return res.json({ error: "Announcement Does Not Exist!" });

  Announcements.destroy({
    where: {
      id: id,
    },
  });

  return res.json({ message: "Admin has been Deleted" });
});


module.exports = router;
