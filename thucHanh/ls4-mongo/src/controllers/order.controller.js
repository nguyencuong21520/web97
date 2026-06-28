import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

const orderController = {
    getOrderByUser: async (req, res) => {
        try {
            const userId = req.user.userId
            const orders = await Order.find({ customerId: userId });
            return res.status(200).json({ message: "Orders fetched successfully", orders });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }

    },
    createOrder: async (req, res) => {
        try {
            const { productId, quantity } = req.body;
            const { userId } = req.user

            //get product by productId

            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            if (product.quantity < quantity) {
                return res.status(400).json({ message: "Out of stock" });
            }

            const newOrder = await Order.create({
                customerId: userId,
                productId: productId,
                quantity: quantity,
                totalPrice: product.price * quantity
            })

            //update product quantity
            await product.updateOne({ $inc: { quantity: -quantity } })
            return res.status(201).json({ message: "Order created successfully", order: newOrder });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

}
export default orderController;