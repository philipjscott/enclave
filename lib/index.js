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
    console.log('testing')
    console.log(url)
    return axios.get(url)
      .then((res) => {
        console.log(res.data)
      })
      .catch(console.error)
  }
}

module.exports = EnclaveUser
