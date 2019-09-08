const express = require('express')
const { getPublicProfile } = require('enclavejs')
const router = express.Router()

router.post('/', (req, res) => {
  getPublicProfile(req.body.profile)
    .then(profile => {
      res.send(profile.getJSON())
    })
    .catch(err => {
      console.log(err)
      res.status(err.response.status).send(err.message)
    })
})

module.exports = router
