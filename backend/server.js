require('dotenv').config()
const app = require('./src/app')
const DbConnect = require('./src/db/db')

DbConnect()


app.listen(process.env.PORT,()=>{
    console.log('server running')
})