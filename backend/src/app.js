const express = require('express')
const AuthRouter = require('')


const app = express()
app.use(cors())
app.use(express.json())

app.use('/api',AuthRouter)

module.exports = app