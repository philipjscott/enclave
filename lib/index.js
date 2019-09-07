const YAML = require('yaml')
const axios = require('axios')
const path = require('path')

const enclaveFilename = 'enclave.yaml'
const getBaseURL = (user, path) => `https://${user}.keybase.pub/${path}`

// Example profile paths:
// scotty
// scotty/gaming
// scotty/gaming/leagueoflegends
function getEnclaveProfile (profilePath) {
  const fragments = profilePath.split('/')
  const [user, ...namespaces] = fragments
  namespaces.push(enclaveFilename)
  const filePath = namespaces.join('/')
  const resourceURL = getBaseURL(user, filePath)

  return axios.get(resourceURL)
    .then((res) => {
      return new EnclaveProfile(res.data)
    })
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

module.exports = getEnclaveProfile
