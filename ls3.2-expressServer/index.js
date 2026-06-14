import express from "express";
import axios from "axios"
import { randomUUID } from "node:crypto"

const PORT = 3002
const API_URL = "http://localhost:3000"
const app = express();

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.get("/customers", async (req, res) => {
    //logic

    const customerData = await axios.get(`${API_URL}/customers`)

    if (!customerData.data) {
        res.status(404).json({
            "data": "xxx",
            "message": "Customers not found"
        })
        return
    }

    res.status(200).json({
        "data": customerData.data,
        "message": "Get All Customers Successfully"
    })
})

app.post("/customers", async (req, res) => {
    const { name, email, age } = req.body

    //checkExistemail
    const existEmail = await axios.get(`${API_URL}/customers?email=${email}`)

    if (existEmail.data.length > 0) {
        return res.status(400).json({
            "message": "Email already exists"
        })
    }

    const newCustomer = {
        id: randomUUID(),
        name,
        email,
        age
    }

    const result = await axios.post(`${API_URL}/customers`, newCustomer)

    res.status(201).json({
        "data": result.data,
        "message": "Customer created successfully"
    })
})

app.get("/orders/:id", async (req, res) => {
    try {
        const id = req.params.id

        const orderInfo = await axios.get(`${API_URL}/orders/${id}`)

        if (!orderInfo.data) {
            throw new Error("Order not found")
        }

        const customerInfo = await axios.get(`${API_URL}/customers?id=${orderInfo.data.customerId}`)
        const productInfo = await axios.get(`${API_URL}/products?id=${orderInfo.data.productId}`)

        const result = {
            ...orderInfo.data,
            customer: customerInfo.data[0],
            product: productInfo.data[0]
        }

        delete result.customerId
        delete result.productId

        res.status(200).json({
            "data": result,
            "message": "Get All Orders Successfully"
        })

    } catch (error) {
        res.status(500).json({
            "data": [],
            "message": error.message || "Internal Server Error"
        })
    }
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})