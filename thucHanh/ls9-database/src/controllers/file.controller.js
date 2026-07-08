import { uploadMultipleToCloudinary, uploadSingleToCloudinary } from "../configs/cloudinary.config.js";
import fs from "fs";
const fileController = {
    uploadSingle: async(req, res) => {
        const file = req.file;
        try {
            if (!file) {
                return res.status(400).json({
                    message: "No file uploaded"
                })
            }
            const result = await uploadSingleToCloudinary(file)
            return res.status(200).json({
                message: "Upload success",
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    uploadMultiple:async(req,res)=>{
        const files = req.files;
        try {
            if(!files || files.length === 0){
                return res.status(400).json({
                    message: "No files uploaded"
                })
            }
            const result = await uploadMultipleToCloudinary(files)
            return res.status(200).json({
                message: "Upload success",
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    deleteSingle: async(req,res)=>{
        const {publicId} = req.body;
        try {
            if(!publicId){
                return res.status(400).json({
                    message: "No publicId provided"
                })
            }
            const result = await deleteFromCloudinary(publicId)
            return res.status(200).json({
                message: "Delete success",
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    },
    deleteMultiple: async(req,res)=>{
        const {publicIds} = req.body;
        try {
            if(!publicIds || publicIds.length === 0){
                return res.status(400).json({
                    message: "No publicIds provided"
                })
            }
            const result = await deleteMultipleFromCloudinary(publicIds)
            return res.status(200).json({
                message: "Delete success",
                data: result
            })
        } catch (error) {
            return res.status(500).json({
                message: error.message
            })
        }
    }
}

export default fileController;