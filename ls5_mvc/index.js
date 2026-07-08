import express from "express";


import connectDB from "./src/configs/db.js";
import userRouter from "./src/routes/user.route.js";
import productRouter from "./src/routes/product.route.js";
import authRouter from "./src/routes/auth.route.js";
import { logInfo } from "./src/middlewares/log.middleware.js";
import authMiddleware from "./src/middlewares/auth.middleware.js";
import upload from "./src/middlewares/multer.middleware.js";
import { uploadMultipleToCloudinary, uploadSingleToCloudinary } from "./src/configs/cloudynary.configs.js";

const app = express();
const PORT = 3000;

//connect mongo
connectDB();

app.use(express.json());
app.use(logInfo)

app.use("/users", authMiddleware.authentication, authMiddleware.authorization("ADMIN"), userRouter)
app.use("/products", authMiddleware.authentication, productRouter)
app.use("/auth", authRouter)

app.use(express.static("public"));

// ===UPLOAD FILE===


app.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const {file} = req
        if (!file) {
            return res.status(400).json({
                message: "No file uploaded"
            })
        }
        const result = await uploadSingleToCloudinary(file)
        res.status(200).json({
            message: "Upload success",
            file: result
        })
    } catch (error) {
        res.status(500).json({
            message: "Upload failed"
        })
    }
})


app.post("/multi-upload", upload.array("images", 10), async (req, res) => {
    try {
        const {files} = req
        console.log(files)
        if (!files) {
            return res.status(400).json({
                message: "No file uploaded"
            })
        }
        const result = await uploadMultipleToCloudinary(files)
        res.status(200).json({
            message: "Upload success",
            file: result
        })


    } catch (error) {
        res.status(500).json({
            message: "Upload failed"
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});