const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 8000

app.use(cors())
app.use(bodyParser())
app.use('/enclave', require('./controllers/enclave'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
