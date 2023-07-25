const express = require('express')
const forceBan = require('../middlewares/protect')
const router = express.Router()
const controllers = require('../controllers/auth-control')



router.get('/', controllers.getHome)

router.get('/home', controllers.redRoot)

router.get('/login', controllers.getLogin)

router.get('/signup', controllers.getSignup)

router.post('/login', controllers.postLogin)

router.post('/signup', controllers.postSignup)

router.post('/logout', controllers.logout)

router.get('/banned', (req, res) => {
    res.render('banned')
})

router.use(forceBan)
router.get('/admin', controllers.getAdmin)






module.exports = router