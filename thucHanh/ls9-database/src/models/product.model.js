import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true},
    sku: { type: String},
    category: {
      type: String,
      required: true,
      enum: [
        'Điện thoại',
        'Laptop',
        'Tai nghe',
        'Đồng hồ thông minh',
        'Robot hút bụi',
        'TV Box',
        'Loa thông minh',
        'Máy lọc không khí',
      ],
    },
    brand: { type: String},
    price: { type: Number, required: true, min: 0 },
    discountPercent: { type: Number, default: 0, min: 0, max: 100 },
    finalPrice: { type: Number, min: 0 },
    currency: { type: String, default: 'VND' },
    stock: { type: Number, default: 0, min: 0 },
    sold: { type: Number, default: 0, min: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true, index: true },
    isFeatured: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
    specifications: {type: String},
    description: { type: String, default: '' },
    images: { type: [String], default: [] },
  },
  {
    timestamps: true,
  },
);

export const Product = mongoose.model("Product", productSchema);
