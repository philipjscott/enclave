import axios from 'axios'

const serverURL = process.env.REACT_APP_SERVER_URL
const getURL = endpoint => `${serverURL}${endpoint}`

export function getProfile(profile) {
  const url = getURL('/enclave')
  return axios.post(url, { profile }).then(res => res.data)
}
