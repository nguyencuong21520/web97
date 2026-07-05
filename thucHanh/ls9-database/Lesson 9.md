**THỰC HÀNH LESSON 9**

# **Bài toán**

Cho nghiệp vụ bán nhà với các thực thể: **Khách hàng**, **Quản lý**, **Nhân viên**, **Nhà ở** và **Đơn đặt cọc**

### **Account \- Tài khoản đăng nhập**

| Trường | Kiểu dữ liệu | Mô tả |
| ----- | ----- | ----- |
| \_id | ObjectId | Mã định danh duy nhất cho tài khoản(PK). |
| email | String | Email đăng nhập \- duy nhất |
| password | String | Mật khẩu |
| isActive | Boolean | Trạng thái kích hoạt của tài khoản, mặc định là **true** |
| role | String | Quyền của tài khoản, chỉ bao gồm MANAGER, CUSTOMER, EMPLOYEE, mặc định là CUSTOMER |

### **Khách hàng \- Customers**

| Trường | Kiểu dữ liệu | Mô tả |
| ----- | ----- | ----- |
| \_id | ObjectId | Mã định danh duy nhất cho khách hàng (PK). |
| name | String | Tên khách hàng |
| email | String | Email của khách hàng |
| phone | String | Số điện thoại liên hệ của khách hàng |
| address | String | Địa chỉ khách hàng |
| accountId | ObjectId | Tham chiếu tới Account |

### 

### **Quản lý \- Managers**

| Thuộc tính | Kiểu dữ liệu | Mô tả |
| ----- | ----- | ----- |
| \_id | ObjectId | Mã định danh duy nhất cho quản lý (PK). |
| name | String | Tên của quản lý |
| email | String | Email của quản lý |
| phone | String | Số điện thoại liên hệ của quản lý |
| department | String | Phòng ban quản lý thuộc về |
| accountId | ObjectId | Tham chiếu tới Account |

### **Nhân viên \- Employees**

| Thuộc tính | Kiểu dữ liệu | Mô tả |
| ----- | ----- | ----- |
| \_id | ObjectId | Mã định danh duy nhất cho nhân viên (PK). |
| name | String | Tên của nhân viên |
| email | String | Email của nhân viên |
| phone | String | Số điện thoại liên hệ của nhân viên |
| managerId | ObjectId | Mã quản lý (FK đến bảng Managers) |
| department | String | Phòng ban của nhân viên |
| accountId | ObjectId | Tham chiếu tới Account |

### 

### **Nhà ở \- Properties**

| Thuộc tính | Kiểu dữ liệu | Mô tả |
| ----- | ----- | ----- |
| \_id | ObjectId | Mã định danh duy nhất cho nhà ở (PK). |
| address | String | Địa chỉ của nhà |
| price | Number | Giá của căn nhà |
| area | Float | Diện tích của căn nhà (m2) |
| status | String | Trạng thái nhà (ví dụ: Đang bán, Đã bán, Dừng bán) |
| employeeId | ObjectId | Mã nhân viên chịu trách nhiệm bán nhà (FK đến bảng Employees) |

### **Đơn đặt cọc \- DepositOrders**

| Thuộc tính | Kiểu dữ liệu | Mô tả |
| ----- | ----- | ----- |
| \_id | ObjectId | Mã định danh duy nhất cho đơn đặt cọc (PK). |
| customerId | ObjectId | Mã khách hàng thực hiện đặt cọc (FK đến bảng Customers) |
| propertyId | ObjectId | Mã nhà được đặt cọc (FK đến bảng Properties) |
| depositAmount | Number | Số tiền đặt cọc |
| date | Date | Ngày thực hiện đặt cọc |
| status | String | Trạng thái đơn đặt cọc (ví dụ: Đã thanh toán, Chờ xử lý, Đã huỷ) |

# **Yêu cầu**

1\. Sử dụng Draw.io [Link](https://draw.io/) (hoặc bất kỳ công cụ khác) thực hiện vẽ biểu đồ quan hệ dữ liệu và giải thích kiểu quan hệ  
2\. Thực hiện cài đặt mongodb và thực hiện tham chiếu quan hệ cho các collection  
3\. Viết API cho phép người dùng đăng ký tài khoản  
4\. Viết API đăng nhập tài khoản, nếu **isActive** là **true** cho phép đăng nhập (trả về các token)  
5\. Viết API lấy thông tin cá nhân **tương ứng** với **role** của tài khoản  
6\. Viết API cho phép người dùng tạo thông tin cá nhân theo role tương ứng của tài khoản (Người dùng đã đăng nhập)  
7\. Viết API cho phép Manager (quản lý) tạo tài khoản, thông tin cho Employee (nhân viên)  
8\. Viết API cho phép Manager (quản lý) hoặc Employee (nhân viên) tạo thông tin Property (nhà ở)  
9\. Viết API cho phép Manager (quản lý) hoặc Employee (nhân viên) cập nhật thông tin Property (nhà ở)  
10\. Viết API cho phép Customer (khách hàng) tạo đơn đặt cọc  
11\. Viết API cho phép  Manager (quản lý) hoặc Employee (nhân viên) lấy thông tin các đơn đặt cọc, kèm theo thông tin của khách hàng (tên, email, số điện thoại)  
12\. Viết API cho phép Customer (khách hàng) xem thông tin các đơn đặt cọc của bản thân bao gồm thông Property (Nhà ở) và Employee (nhân viên) (tên, email, số điện thoại) hỗ trợ cho đơn đó (là nhân viên có trách nhiệm với căn nhà đặt cọc).  
13\. Viết API cho phép Nhân viên (Employee) xem danh sách nhà ở mà họ đang quản lý  
14\. Viết API cho phép Quản lý (Manager) xem tất cả các đơn đặt cọc của hệ thống  
15\. Viết API cho phép Quản lý (Manager) lấy thông tin cá nhân của tất cả nhân viên dưới quyền