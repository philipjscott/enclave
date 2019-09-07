const test = require('ava')
const EnclaveUser = require('../')

// https://sokojoe.keybase.pub/.enclave/enclave.yaml
// username: Sokojoe
// full_name: Joseph Sokolon
// email: sokojoey@gmail.com
// profile_image_url: /keybase/public/sokojoe/joey.png
test('works with keybase account', async t => {
  const user = new EnclaveUser('sokojoe')
  try {
    const profile = await user.getProfile('.enclave')

    console.log(profile.getJSON())

    t.is(profile.getUsername(), 'Sokojoe')
    t.is(profile.getFullname(), 'Joseph Sokolon')
    t.is(profile.getEmail(), 'sokojoey@gmail.com')
    t.is(profile.getProfileImageURL(), '/keybase/public/sokojoe/joey.png')
    t.is(profile.getValue('profile_image_url'), '/keybase/public/sokojoe/joey.png')
  } catch (err) {
    console.log(err)

    t.fail()
  }
})
