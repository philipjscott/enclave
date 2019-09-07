Module exports a constructor for an `EnclaveUser`.

## EnclaveUser

Constructor:

* `new EnclaveUser(user)`

`user` is a keybase user

Methods:

* `getProfile(profilePath)`

`profilePath` is a path to an enclave profile (a folder that has an `enclave.yaml`).
Returns a promise that resolves to an `EnclaveProfile`.

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
