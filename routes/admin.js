const express = require("express");
const controller = require("../controllers/admin-control");
const protectRoute = require('../middlewares/protection')
const router = express.Router();

router.use(protectRoute)
router.post("/new-user", controller.addUsers);

router.post("/user/:id/ban", controller.Ban)

router.post("/user/:id/make-admin", controller.makeAdmin)

module.exports = router;
