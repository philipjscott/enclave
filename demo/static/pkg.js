import getProfile from 'enclavejs'

export function foo () {
  console.log('yo')
  getProfile('sokojoe/.enclave').then(profile => {
    console.log(profile.getJSON())
  })
}
