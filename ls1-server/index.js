import http from "http";
import { customers, orders, products } from "./data.js";
const app = http.createServer((req, res)=>{
    const endpoint = req.url
    console.log("🚀 ~ endpoint:", endpoint)

    // get all customers 
    if(endpoint === "/customers"){
        res.setHeader("Content-Type", "application/json; charset=utf-8")
        res.end(JSON.stringify(customers))
        return
    }

    // get order by customer id
    if(endpoint.startsWith("/customers/") && endpoint.endsWith("/orders")){
        const id = endpoint.split("/")[2]
        res.setHeader("Content-Type", "application/json; charset=utf-8")

        const result = orders.filter(order => order.customerId === id)
        res.end(JSON.stringify(result))
        return
    }

    //get a customer by id
    if(endpoint.startsWith("/customers/")){
        const id = endpoint.split("/")[2]

        res.setHeader("Content-Type", "application/json; charset=utf-8")
        const customer = customers.find(customer => customer.id === id)
        if(!customer){
            res.end(JSON.stringify({ error: "Customer not found" }))
            return
        }
        res.end(JSON.stringify(customer))
        return
    }

    //get product by range
    if(endpoint.startsWith("/products?")){
        //get min & max price value
        const params = new URLSearchParams(endpoint.split("?")[1])
        const minPrice = Number(params.get("minPrice"))
        const maxPrice = Number(params.get("maxPrice"))

        const result = products.filter(
            product => product.price >= minPrice && product.price <= maxPrice
        )

        res.setHeader("Content-Type", "application/json; charset=utf-8")
        res.end(JSON.stringify(result))
        return
    }

    res.setHeader("Content-Type", "text/plain; charset=utf-8")
    res.end("Server is running")
})

app.listen(3003, ()=>{
    console.log("Server is running on port 3003")
})



