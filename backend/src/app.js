const express = require('express')
const AuthRouter = require('./routes/auth.routes')
const testRouter = require('./routes/testRoutes')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', AuthRouter)
app.use('/api', testRouter)

module.exports = app