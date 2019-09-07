const test = require('ava')
const EnclaveUser = require('../')

// https://sokojoe.keybase.pub/.enclave/enclave.yaml
test('works with keybase account', async t => {
  const user = new EnclaveUser('sokojoe')
  const res = user.getProfile('.enclave')
  try {
    await res
    t.pass()
  } catch (err) {
    t.fail()
  }
})
