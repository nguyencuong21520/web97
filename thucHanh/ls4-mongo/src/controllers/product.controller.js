import Product from "../models/product.model.js"
const productController = {
    //get product by price range
    getByPriceRange: async (req, res) => {
        try {
            const { minPrice, maxPrice } = req.query;
            if (!minPrice || !maxPrice) {
                return res.status(400).json({ message: "minPrice and maxPrice are required" });
            }
            if (Number(minPrice) > Number(maxPrice)) {
                return res.status(400).json({ message: "minPrice must be less than or equal to maxPrice" });
            }
            const products = await Product.find({ price: { $gte: Number(minPrice), $lte: Number(maxPrice) } });
            res.status(200).json({
                message: "Get product by price range successfully",
                data: products
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default productController;