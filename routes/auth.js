const express = require('express')

const router = express.Router()
const controllers = require('../controllers/auth-control')
const upload = require("../util/multer-config")


router.get('/', controllers.getHome)

router.get('/home', controllers.redRoot)

router.get('/login', controllers.getLogin)

router.get('/signup', controllers.getSignup)

router.get('/admin', controllers.getAdmin)

router.post('/login', controllers.postLogin)

router.post('/signup', controllers.postSignup)

router.post('/logout', controllers.logout)

router.get('/profile', controllers.getProfile)

router.post('/profile', upload.single("avatar"), controllers.postProfile )


module.exports = router