
require("dotenv").config()
const express = require("express")
const cors = require ("cors")
const connectDB = require ("./config/db")
const logger = require ('./src/utils/logger')

const authRoutes = require ('./src/routes/auth.routes')
const productRoutes = require ('./src/routes/product.routes')
const purchaseRoutes = require ('./src/routes/purchase.routes')

const app = express()
const PORT = process.env.PORT || 4000

//Middleware
app.use(cors())
app.use(express.json())

//Routes
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/purchases", purchaseRoutes)

//Health
app.get('/healt', (req, res) => res.json({ ok: true, time: new Date() }))

//Global error handler
app.use((err, req, res, next) => {
    logger.error (err.stack || err.message || JSON.stringify(err))
    res.status (err.status || 500).json({ message: err.message || 'internal Server Error'}) 
}) 

//Start
connectDB()
.then (() => {
    app.listen(PORT, () => {
        console.log('Server corriendo en puerto ${PORT}')
        logger.info ('Server funcionando en puerto ${PORT}')
    })
})
.catch((err) =>{
    logger.error ('Fallo la conexión DB: ' + err.message)
    process.exit(1)
})
