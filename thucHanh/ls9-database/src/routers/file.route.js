import {Router} from "express";
const fileRouter = Router();
import fileController from "../controllers/file.controller.js";

import upload from "../middlewares/multer.middleware.js";


fileRouter.post("/single",upload.single("file"),fileController.uploadSingle)
fileRouter.post("/multiple",upload.array("files",10),fileController.uploadMultiple)
fileRouter.delete("/single",fileController.deleteSingle)
fileRouter.delete("/multiple",fileController.deleteMultiple)

export default fileRouter