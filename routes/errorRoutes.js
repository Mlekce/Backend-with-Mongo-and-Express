const express = require("express");

const router = express.Router();

router.get("/401", (req, res) => {
  res.render("401");
});

router.get("/403", (req, res) => {
  res.render("403");
});

router.get("/404", (req, res) => {
  res.render("404");
});

router.get("/500", (req, res) => {
  res.render("500");
});

module.exports = router;
