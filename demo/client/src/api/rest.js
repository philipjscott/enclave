import axios from 'axios'

const serverURL = process.env.REACT_APP_SERVER_URL
const getURL = endpoint => `${serverURL}${endpoint}`

export function getPublicProfile(profile) {
  const url = getURL('/pub')
  return axios.post(url, { profile }).then(res => res.data)
}

export function getPrivateProfile(profile, password) {
  const url = getURL('/shop')
  return axios.post(url, { profile, password }).then(res => res.data)
}
