const express = require("express");
const controller = require("../controllers/admin-control");
const router = express.Router();

router.post("/new-user", controller.addUsers);

router.post("/user/:id/ban", controller.Ban)


module.exports = router;
