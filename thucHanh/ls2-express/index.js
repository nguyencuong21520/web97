import express from "express";
import { customers, products, orders } from "./data.js"
import { randomUUID } from "node:crypto"
import { CONNREFUSED } from "node:dns";

const app = express()
const PORT = 3002

app.use(express.json())

app.get("/", (req, res) => {
    res.status(200).send("Server is running")
})

app.post("/customer", (req, res) => {
    const { name, email, age } = req.body
    //check email exist
    const emailExist = customers.find((c) => c.email === email)
    if (emailExist) {
        return res.status(400).json({ message: "Email already exists" })
    }
    //create new customer
    const customer = {
        id: randomUUID(),
        name,
        email,
        age
    }

    customers.push(customer)

    res.status(201).json({
        data: customer,
        message: "Customer created successfully"
    })
})

app.post("/order", (req, res) => {
    const { customerId, productId, quantity } = req.body
    //get product by productId
    const existProduct = products.find((p) => p.id === productId)
    if (!existProduct) {
        return res.status(400).json({ message: "Product not found" })
    }
    //check exist customer by customerId => todo
    //check quantity valid
    if (existProduct.quantity < quantity) {
        return res.status(400).json({ message: "Quantity is not enough" })
    }

    const newOrder = {
        id: randomUUID(),
        customerId,
        productId,
        quantity,
        totalPrice: quantity * existProduct.price
    }
    orders.push(newOrder)
    //update quantity of product => doto
    res.status(201).json({
        data: newOrder,
        message: "Order created successfully"
    })
})

app.get("/customers", (req, res) => {
    res.status(200).json({
        data: customers,
        message: "Customers fetched successfully"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

