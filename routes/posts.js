const express = require('express')
const router = express.Router()

const controller = require('../controllers/posts-control')

router.get('/posts', controller.getPosts)

router.get('/myposts', controller.getMyPosts)

router.post('/myposts/create', controller.postCreate)

module.exports = router