# Hướng Dẫn Các Câu Lệnh CRUD Cơ Bản Với Mongoose

Tài liệu này hướng dẫn cách thực hiện các thao tác **CRUD** (Create, Read, Update, Delete) cơ bản bằng **Mongoose** trong Node.js, sử dụng mô hình ES Modules (`import/export`) tương tự như trong project này.

Các ví dụ dưới đây đều dựa trên model [Product](file:///Users/nvc/Desktop/mindx/web97/thucHanh/ls4-mongo/src/models/product.model.js) có cấu trúc:
- `name` (String)
- `price` (Number)
- `quantity` (Number)

---

## 1. Import Model và Chuẩn Bị
Trước hết, hãy import model `Product` vào file controller hoặc route của bạn:

```javascript
import Product from './src/models/product.model.js';
```

---

## 2. CREATE (Thêm mới dữ liệu)

Có 2 cách phổ biến để tạo mới một document trong database:

### Cách 1: Sử dụng `new Model()` và `.save()`
Cách này hữu ích khi bạn cần thao tác hoặc xử lý dữ liệu của đối tượng trước khi lưu.
```javascript
const createProduct = async () => {
    try {
        const newProduct = new Product({
            name: "Bàn phím cơ cơ học",
            price: 1500000,
            quantity: 50
        });

        // Lưu vào database
        const savedProduct = await newProduct.save();
        console.log("Sản phẩm đã tạo:", savedProduct);
    } catch (error) {
        console.error("Lỗi khi tạo sản phẩm:", error);
    }
};
```

### Cách 2: Sử dụng `Model.create()`
Cách này nhanh gọn hơn, tự động khởi tạo và lưu document vào database cùng lúc.
```javascript
const createProductQuickly = async () => {
    try {
        const product = await Product.create({
            name: "Chuột không dây",
            price: 500000,
            quantity: 100
        });
        console.log("Sản phẩm đã tạo:", product);
    } catch (error) {
        console.error("Lỗi:", error);
    }
};
```

---

## 3. READ (Truy vấn / Lấy dữ liệu)

### Lấy toàn bộ danh sách sản phẩm
```javascript
const getAllProducts = async () => {
    try {
        const products = await Product.find();
        console.log("Tất cả sản phẩm:", products);
    } catch (error) {
        console.error("Lỗi:", error);
    }
};
```

### Tìm kiếm sản phẩm theo điều kiện cụ thể
```javascript
const getFilteredProducts = async () => {
    try {
        // Tìm sản phẩm có giá lớn hơn hoặc bằng 1,000,000đ
        const products = await Product.find({ price: { $gte: 1000000 } });
        console.log("Sản phẩm đắt tiền:", products);
    } catch (error) {
        console.error("Lỗi:", error);
    }
};
```

### Tìm một sản phẩm duy nhất theo điều kiện
```javascript
const getOneProduct = async () => {
    try {
        const product = await Product.findOne({ name: "Chuột không dây" });
        console.log("Tìm thấy sản phẩm:", product);
    } catch (error) {
        console.error("Lỗi:", error);
    }
};
```

### Tìm sản phẩm theo `_id`
```javascript
const getProductById = async (id) => {
    try {
        const product = await Product.findById(id);
        console.log("Sản phẩm tìm theo ID:", product);
    } catch (error) {
        console.error("Lỗi:", error);
    }
};
```

---

## 4. UPDATE (Cập nhật dữ liệu)

### Cách 1: Tìm bằng ID và cập nhật (`findByIdAndUpdate`)
Đây là phương pháp phổ biến nhất trong các API thực tế.
```javascript
const updateProductById = async (id) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            {
                price: 1400000, // Cập nhật lại giá mới
                quantity: 45    // Cập nhật số lượng mới
            },
            { new: true } // Tham số này để trả về document mới sau khi cập nhật (mặc định trả về document cũ)
        );
        console.log("Sản phẩm sau khi cập nhật:", updatedProduct);
    } catch (error) {
        console.error("Lỗi:", error);
    }
};
```

### Cách 2: Cập nhật một document dựa trên điều kiện (`updateOne`)
```javascript
const updateOneProduct = async () => {
    try {
        const result = await Product.updateOne(
            { name: "Chuột không dây" },
            { $set: { price: 550000 } }
        );
        console.log("Kết quả cập nhật:", result); // Trả về thông tin { acknowledged: true, modifiedCount: 1, ... }
    } catch (error) {
        console.error("Lỗi:", error);
    }
};
```

### Cách 3: Cập nhật nhiều document cùng lúc (`updateMany`)
```javascript
const updateAllOutOfStock = async () => {
    try {
        // Cập nhật tất cả các sản phẩm có quantity = 0
        const result = await Product.updateMany(
            { quantity: 0 },
            { $set: { name: "[HẾT HÀNG]" } } // Hoặc set cứng giá trị nào đó
        );
        console.log("Đã cập nhật hàng loạt:", result);
    } catch (error) {
        console.error("Lỗi:", error);
    }
};
```

---

## 5. DELETE (Xóa dữ liệu)

### Cách 1: Tìm bằng ID và xóa (`findByIdAndDelete`)
```javascript
const deleteProductById = async (id) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        console.log("Sản phẩm đã bị xóa:", deletedProduct);
    } catch (error) {
        console.error("Lỗi:", error);
    }
};
```

### Cách 2: Xóa một document dựa trên điều kiện (`deleteOne`)
```javascript
const deleteOneProduct = async () => {
    try {
        const result = await Product.deleteOne({ name: "Chuột không dây" });
        console.log("Kết quả xóa:", result); // Trả về thông tin { acknowledged: true, deletedCount: 1 }
    } catch (error) {
        console.error("Lỗi:", error);
    }
};
```

### Cách 3: Xóa nhiều document cùng lúc (`deleteMany`)
```javascript
const clearOutdatedProducts = async () => {
    try {
        // Xóa tất cả các sản phẩm có số lượng bằng 0
        const result = await Product.deleteMany({ quantity: 0 });
        console.log("Đã xóa các sản phẩm hết hàng:", result);
    } catch (error) {
        console.error("Lỗi:", error);
    }
};
```

---

## 6. Các tùy chọn truy vấn nâng cao (Phân trang, Sắp xếp, Chọn trường)

### Phân trang (Pagination) và Sắp xếp (Sorting)
```javascript
const getProductsPagination = async (page = 1, limit = 10) => {
    try {
        const skip = (page - 1) * limit;
        const products = await Product.find()
            .sort({ price: -1 }) // Sắp xếp theo giá giảm dần (-1: giảm dần, 1: tăng dần)
            .skip(skip)          // Bỏ qua bao nhiêu sản phẩm đầu
            .limit(limit);       // Lấy giới hạn bao nhiêu sản phẩm

        console.log(`Danh sách trang ${page}:`, products);
    } catch (error) {
        console.error("Lỗi:", error);
    }
};
```

### Chọn trường hiển thị (Projection)
```javascript
const getProductNamesOnly = async () => {
    try {
        // Chỉ lấy trường 'name' và 'price', loại trừ '_id'
        const products = await Product.find()
            .select("name price -_id");
        console.log("Danh sách tên và giá:", products);
    } catch (error) {
        console.error("Lỗi:", error);
    }
};
```
