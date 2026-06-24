import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const userRouter = Router()

userRouter.get("/", userController.getAll)
userRouter.get("/:id", authMiddleware.authorization("ADMIN"), userController.getById)
userRouter.put("/:id", userController.update)
userRouter.delete("/:id", userController.delete)

export default userRouter
