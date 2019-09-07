const express = require('express')
const app = express()
const port = 3000

app.get('/hello', require('./apps/hello'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
