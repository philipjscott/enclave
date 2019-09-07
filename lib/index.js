const YAML = require('yaml')
const axios = require('axios')
const path = require('path')

const enclaveFile = 'enclave.yaml'
const getBaseURL = user => path => `https://${user}.keybase.pub/${path}`

class EnclaveUser {
  constructor (user) {
    this._getURL = getBaseURL(user)
    this.keyValues = {}
  }

  getProfile (profilePath) {
    const filePath = path.join(profilePath, enclaveFile)
    const url = this._getURL(filePath)
    return axios.get(url)
      .then((res) => {
        return new EnclaveProfile(res.data)
      })
  }
}

// Example payload:
// username: AliceRox
// full_name: Alice Bobation
// email: alice1234@gmail.com
// profile_image_url: /keybase/public/<username>/.enclave/profilepic.png
class EnclaveProfile {
  constructor (enclaveFile) {
    this.yaml = YAML.parse(enclaveFile)
  }

  getJSON () {
    return this.yaml
  }

  getValue (key) {
    return this.yaml[key]
  }

  getUsername () {
    return this.getValue('username')
  }

  getFullname () {
    return this.getValue('full_name')
  }

  getEmail () {
    return this.getValue('email')
  }

  getProfileImageURL () {
    return this.getValue('profile_image_url')
  }
}

module.exports = EnclaveUser
