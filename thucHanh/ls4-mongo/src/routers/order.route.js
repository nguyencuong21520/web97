import { Router } from "express";
import orderController from "../controllers/order.controller.js";

const orderRouter = Router();
orderRouter.get("/get-order-by-user", orderController.getOrderByUser);
orderRouter.post("/", orderController.createOrder);


export default orderRouter;