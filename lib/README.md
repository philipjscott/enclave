Module exports an object with the following functions:

## enclave.getPublicProfile

Usage:

```js 
enclave.getPublicProfile('myuser/namespace')
  .then(profile => {
    console.log(profile.getJSON())
  })
```

Takes in a profile path and returns a promise that
resolves to an `EnclaveProfile`. The promise will
reject if the keybase filesystem is down, or the
`enclave.yaml` file is malformed.

## enclave.getPrivateProfile

Usage:

```js 
enclave.getPrivateProfile('myuser/namespace', 'another_org')
  .then(profile => {
    console.log(profile.getJSON())
  })
```

Gets the private profile shared between the user and an organization.
Resolves to an `EnclaveProfile`, similar to `getPublicProfile`

## EnclaveProfile

Methods:

* `getJSON()`

Returns a JSON representation of the file

* `getValue()`

Returns a value given a key. Returns `undefined` if the key is not set

* `getUsername()`
* `getFullname()`
* `getEmail()`
* `getProfileImageURL()`

const EnclaveUser = require('enclavejs')
const user = new EnclaveUser('myuser')
`
