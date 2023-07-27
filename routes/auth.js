const express = require('express')
const forceBan = require('../middlewares/protect')
const protectRoute = require('../middlewares/protection')
const router = express.Router()
const controllers = require('../controllers/auth-control')


router.get('/reset', controllers.resetPage)

router.post('/reset', controllers.resetPassword)

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
router.use(protectRoute)
router.use(forceBan)
router.get('/admin', controllers.getAdmin)






module.exports = router