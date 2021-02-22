const express = require("express");
const { user } = require("../models/index");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 12);
    // check email from db to make sure its unique
    const checkUser = await user.findOne({
      where: {
        email: email,
      },
    });
    if (checkUser) {
      res.status(400);
      res.send("!! Email is already registered !!");
    } else {
      const newUser = await user.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        passwordHash: passwordHash,
      });
      res.send(newUser); // don't send the user object
    }
  } catch (err) {
    res.status(500).end();
    console.error(err);
  }
});

module.exports = router;
