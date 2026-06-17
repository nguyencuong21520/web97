import express from 'express'
import mongoose from 'mongoose'

import UserModel from './src/models/user.model.js'

const app = express()
const PORT = 3030
app.use(express.json())

//connect mongoDB
mongoose
    .connect("")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err))

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>")
})

//Create 

app.post("/users", async (req, res) => {
    const { username, email, password } = req.body
    //create with userModel
    const user = await UserModel.create({ username, email, password })

    res.status(201).json({ message: "User created", data: user })
})

app.get("/users", async (req, res) => {
    const users = await UserModel.find()
    res.status(200).json({ message: "Get user success", data: users })
})

app.get("/users/:id", async (req, res) => {
    const { id } = req.params
    const user = await UserModel.findById(id)
    res.status(200).json({ message: "Get user success", data: user })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})