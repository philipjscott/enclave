const express = require('express')
const getProfile = require('enclavejs')
const router = express.Router()

router.post('/', (req, res) => {
  getProfile(req.body.profile)
    .then(profile => {
      res.send(profile.getJSON())
    })
    .catch(err => {
      res.status(err.response.status).send(err.message)
    })
})

module.exports = router
