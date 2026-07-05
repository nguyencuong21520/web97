import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import authMiddleWare from "../middlewares/auth.middleware.js";

const authRoute = Router();

authRoute.post("/register", authController.register);
authRoute.post("/login", authController.login);
authRoute.get("/profile", authMiddleWare.authen, authController.getProfile);

export default authRoute;
