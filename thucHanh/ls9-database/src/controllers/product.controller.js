import { Product } from "../models/product.model.js";

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const {page = 1, limit = 10, search = '', active, brand, sortType = 'price', sortOrder = 'desc'} = req.query;
            if(page <= 0 || limit <=0){
                return res.status(400).json({ message: "Invalid page or limit" });
            }

            //query condition
            const query = {};
            if(search){
                query.$or = [
                    {name: {$regex: search, $options: "i"}},
                    {category: {$regex: search, $options: "i"}}
                ];
            }
            if(active){
                query.isActive = active;
            }
            if(brand){
                query.brand = brand;
            }
            //sort 
            const sort = {};
            if(sortType && sortOrder){
                sort[sortType] = sortOrder === "desc" ? -1 : 1;
            }

            const products = await Product.find(query).sort(sort).skip((page - 1) * limit).limit(Number(limit));
            const totalProducts = await Product.countDocuments();
            res.status(200).json({
                message: "get all products successfully",
                data: products,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalResult: products.length,
                    totalAllItems: totalProducts,
                    totalPages: Math.ceil(totalProducts / limit)
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default productController;