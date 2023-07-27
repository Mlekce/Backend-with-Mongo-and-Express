const express = require('express')
const router = express.Router()
const controller = require('../controllers/comment-control')

router.get('/post/:id/comments', controller.fetchComments)

router.post('/post/:id/comments', controller.postComments)


module.exports = router