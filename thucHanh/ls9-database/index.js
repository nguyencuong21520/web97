import express from "express"
import connectDB from "./src/configs/db.js"
import authRoute from "./src/routers/auth.route.js"
import productRoute from "./src/routers/product.route.js"
import orderRoute from "./src/routers/order.route.js"

import authMiddleWare from "./src/middlewares/auth.middleware.js"

const app = express()
const PORT = 3030
app.use(express.json())

//connect to MongoDB
connectDB()

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to My API" })
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})