const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const { user } = require("../models/index");

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const userFromDb = await user.findOne({ where: { email: email } });
  const passwordCorrect =
    userFromDb === null
      ? false
      : await bcrypt.compare(password, userFromDb.passwordHash);

  if (!(userFromDb && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid email || password",
    });
  }

  const userForToken = {
    id: userFromDb.id,
  };

  const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
    expiresIn: "14d",
  });

  // res.
  //   .send(200)
  //   .cookie({ token, email: userFromDb.email, firstName: userFromDb.firstName })

  res
    .status(200)
    .send({ token, email: userFromDb.email, firstName: userFromDb.firstName });
});

module.exports = router;
