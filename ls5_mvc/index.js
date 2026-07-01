import express from "express";

import connectDB from "./src/configs/db.js";
import userRouter from "./src/routes/user.route.js";
import productRouter from "./src/routes/product.route.js";
import authRouter from "./src/routes/auth.route.js";
import { logInfo } from "./src/middlewares/log.middleware.js";
import authMiddleware from "./src/middlewares/auth.middleware.js";

const app = express();
const PORT = 3000;

//connect mongo
connectDB();

app.use(express.json());
app.use(logInfo)

app.use("/users", authMiddleware.authentication, authMiddleware.authorization("ADMIN"), userRouter)
app.use("/products", authMiddleware.authentication, productRouter)
app.use("/auth", authRouter)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});