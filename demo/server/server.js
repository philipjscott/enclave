const express = require('express')
const path = require('path')
const app = express()
const port = 8000

app.use('/hello', require('./controllers/hello'))
app.use('/bookface', require('./controllers/bookface'))
app.use('/picto', require('./controllers/picto'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
