const express = require('express')
const path = require('path')
const Router = express.Router
const router = Router()

router.use(express.static(path.join(__dirname, 'src')));

module.exports = router
