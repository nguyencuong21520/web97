import { Router } from "express";

const productRouter = Router()

productRouter.get("/", (req, res) => {
    console.log("get product")
    res.send("get product")
})

export default productRouter