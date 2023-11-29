const express = require("express");
const router = express.Router();
const { Teachers, Subjects, Appreciation_Books } = require("../models");
const { validateToken } = require("../middlewares/userAuth");
const { sign } = require("jsonwebtoken");
const { uploadFile } = require("../middlewares/uploadFile");

// Get User by Id
router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
  
    const user = await Users.findOne({
      where: { id: id },
    });
    if (user) {
      return res.json(user);
    } else {
      return res.json({ error: "No user with such id" });
    }
});

router.get("/authToken", validateToken, (req, res) => {
    return res.json(req.user);
});

module.exports = router;
