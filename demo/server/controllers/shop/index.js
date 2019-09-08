const express = require('express')
const { getPrivateProfile } = require('enclavejs')
const router = express.Router()

const org = 'onesies'

router.post('/', (req, res) => {
  getPrivateProfile(req.body.profile, org)
    .then((profile) => {
      const profileJSON = profile.getJSON()
      if (req.body.password === profileJSON.password) {
        const last4 = profileJSON.credit_card.card_number.slice(-4)
        res.send({ truncated: last4 })
      } else {
        res.status(401).send({ message: 'Incorrect password' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(err.response.status).send(err.message)
    })
})

module.exports = router
