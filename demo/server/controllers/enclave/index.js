const express = require('express')
const getProfile = require('enclavejs')
const router = express.Router()

router.post('/', (req, res) => {
  getProfile(req.body.profile)
    .then(profile => {
      res.send(profile.getJSON())
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

module.exports = router
