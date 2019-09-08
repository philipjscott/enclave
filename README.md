# Enclave ⛰️

## Inspiration
The idea that users should **own** and **control** their personal data. We wanted to design a system where users do just that. A secure **enclave** for your data in the vast realm of the web. A big thanks to  Dr. Ann Cavoukian for her moving speech and helping us come up with the name.

## What it does
* Enclave is a protocol for making personal data accessible to organizations while keeping the user in control. Users create enclave.yaml files in public and private file locations and specify the infomation they would like to share through key value pairs. 

* Enclave Bot is a Keybase chat bot that allows users to configure their Enclave.yaml files without touching the filesystem. 

* Enclave.js is a npm package that provides functionality to pull user data from the KBFS based on the Enclave protocol.

## How we built it
* Enclave is a protocol; we a created a markdown document specifying the protocol.
* We created two demo websites to showcase some of the ways the enclave protocol could be used.
* We published an NPM package that is used by our demo server to retrieve enclave profiles.
* We also created a Keybase Bot so users can manage their enclave.yaml files without performing manual filesystem operations.

## Challenges we ran into
Due to the cutting-edge nature of the KBFS, we had to create our own Golang client for abstracting KBFS operations. In addition, we had a very poor user experience when using KBFS with Windows :(

KBFS works great on Linux though, and we were ultimately impressed by its remote mounting capabilities!

## Accomplishments that we're proud of
We're proud of coming up with a hack that we feel is very inline with the theme of Citizen Hacks, and not just something flashy to be demoed. We're also proud of utilizing a wide variety of technologies that our hack builds upon.

## What we learned
* We became familiar with KBFS (we built an abstraction layer on top of it!)
* We learned the value of sleep (Zzzz).
* One of our team members used Golang for the first time!
* More is less; focus on the stuff people will understand, use, and appreciate.

## Built With
KBFS
node.js
express.js
react
blueprint.js
golang
[go-keybase-chat-bot](https://github.com/keybase/go-keybase-chat-bot)


## What's next for Enclave
We would like to extend Enclave by creating a web application for managing enclave files. We would also like to create a website which outlines the spec in an attractive way and provides download links for all of the tooling we've created. 

## Links
https://github.com/ScottyFillups/enclave
https://www.npmjs.com/package/enclavejs
