const express  = require('express')
const path = require('path')
const router = express.Router()

const filePath = path.join(__dirname, './index.html')

router.get('/', (req, res) => res.sendFile(filePath))
router.use('/static', express.static(path.join(__dirname, 'static')))

module.exports = router
