const YAML = require('yaml')
const axios = require('axios')
const fs = require('fs')

const enclaveFilename = 'enclave.yaml'
const getBaseURL = (user, path) => `https://${user}.keybase.pub/.enclave/${path}`
const getPrivateFilepath = (userA, userB, path) => `/Keybase/private/${userA}#${userB}/.enclave/${path}`

function getPrivateProfile (profilePath, org) {
  const fragments = profilePath.split('/')
  const [user, ...namespaces] = fragments
  namespaces.push(enclaveFilename)
  const filePath = namespaces.join('/')
  const resourcePath = getPrivateFilepath(user, org, filePath)

  return new Promise((resolve, reject) => {
    fs.readFile(resourcePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err)
      }
      return resolve(new EnclaveProfile(data))
    })
  })
}

// Example profile paths:
// scotty
// scotty/gaming
// scotty/gaming/leagueoflegends
function getPublicProfile (profilePath) {
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

module.exports = {
  getPublicProfile,
  getPrivateProfile
}
