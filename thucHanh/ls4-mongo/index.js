import express from "express"
import connectDB from "./src/configs/db.js"
import authRoute from "./src/routers/auth.route.js"

const app = express()
const PORT = 3030
app.use(express.json())

//connect to MongoDB
connectDB()

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to My API" })
})

app.use("/auth", authRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})