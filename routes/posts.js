const express = require('express')
const router = express.Router()

router.post('/post/create')

router.post('/post/:id/delete')

router.post('/post/:id/update')

router.post('/post/:id/find')

router.post('/post/:id/find-all')

module.exports = router