const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.use('/hello', require('./apps/hello'))

app.use('/bookface', require('./apps/bookface'))
app.use('/picto', require('./apps/picto'))
app.use('/static', express.static(path.join(__dirname, './dist')))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
