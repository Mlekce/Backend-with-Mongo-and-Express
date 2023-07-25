const express = require('express')
const upload = require("../util/multer-config")
const controllers = require('../controllers/auth-control')

const router = express.Router()

router.get('/profile', controllers.getProfile)

router.post('/profile', upload.single("avatar"), controllers.postProfile )

module.exports = router