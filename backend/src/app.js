const express = require('express')
const AuthRouter = require('./routes/auth.routes')
const productRouter = require('./routes/product.routes')
const cartRouter = require('./routes/cart.routes')
const orderRouter = require('./routes/order.routes')
const statsRouter = require('./routes/admin.routes')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cors({
    origin: "http://localhost:5173" || "https://vibehour.vercel.app/",
    credentials: true,
}))
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', AuthRouter)
app.use('/api/products', productRouter )
app.use("/api/cart", cartRouter );
app.use("/api/orders",orderRouter)
app.use("/api/admin",statsRouter)

module.exports = app