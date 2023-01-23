const express = require("express");
const router = new express.Router();

const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { SECRET_KEY } = require("../config");
const createToken = require("../helpers/tokens");

router.post("/login", async function (req, res, next) {
  try {
    let { username, password } = req.body;
    if (await User.authenticate(username, password)) {
      let token = jwt.sign({ username }, SECRET_KEY);
      return res.json({ token });
    } else {
      throw new Error("Invalid username/password", 400);
    }
  } catch (err) {
    return next(err);
  }
});

router.post("/register", async function (req, res, next) {
  try {
    let { username, password } = req.body;
    const newUser = await User.register(username, password);
    const token = createToken(newUser);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
