const express = require("express");
const controller = require("../controllers/admin-control");

const router = express.Router();

router.post("/new-user", controller.addUsers);

router.post("/user/:id/ban", controller.Ban)


//router.post("/user/:id/reset", controller.resetPassword)

module.exports = router;
