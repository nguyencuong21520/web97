import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customerId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
})

const Order = mongoose.model("Order", orderSchema)
export default Order