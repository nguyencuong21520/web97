import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    area: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ["SALE", "SOLD", "STOPPED"],
        default: "SALE"
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    }
}, {
    timestamps: true
});

const Property = mongoose.model("Property", propertySchema);
export default Property;
