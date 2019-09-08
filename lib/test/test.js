const test = require('ava')
const { getPublicProfile, getPrivateProfile } = require('../')

// https://sokojoe.keybase.pub/.enclave/enclave.yaml
// username: Sokojoe
// full_name: Joseph Sokolon
// email: sokojoey@gmail.com
// profile_image_url: /keybase/public/sokojoe/joey.png
test('works with keybase account', async t => {
  try {
    const profile = await getPublicProfile('sokojoe')
    const imageURL = 'https://sokojoe.keybase.pub/.enclave/joey.jpg'

    console.log(profile.getJSON())

    t.is(profile.getUsername(), 'Sokojoe')
    t.is(profile.getFullname(), 'Joseph Sokolon')
    t.is(profile.getEmail(), 'sokojoey@gmail.com')
    t.is(profile.getProfileImageURL(), imageURL)
    t.is(profile.getValue('profile_image_url'), imageURL)
  } catch (err) {
    console.error(err)

    t.fail()
  }
})

test('works with private account', async t => {
  try {
    const profile = await getPrivateProfile('sokojoe', 'onesies')

    console.log(profile.getJSON())

    t.pass()
  } catch (err) {
    console.error(err)

    t.fail()
  }
})
