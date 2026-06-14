const customers = [
    {
        id: "c001",
        name: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        age: 28
    },
    {
        id: "c002",
        name: "Trần Thị B",
        email: "tranthib@example.com",
        age: 32
    },
    {
        id: "c003",
        name: "Lê Văn C",
        email: "levanc@example.com",
        age: 24
    },
    {
        id: "c004",
        name: "Phạm Thị D",
        email: "phamthid@example.com",
        age: 29
    },
    {
        id: "c005",
        name: "Hoàng Văn E",
        email: "hoangvane@example.com",
        age: 35
    },
    {
        id: "c006",
        name: "Đỗ Thị F",
        email: "dothif@example.com",
        age: 27
    },
    {
        id: "c007",
        name: "Vũ Văn G",
        email: "vuvang@example.com",
        age: 31
    },
    {
        id: "c008",
        name: "Phan Thị H",
        email: "phanthih@example.com",
        age: 26
    },
    {
        id: "c009",
        name: "Ngô Văn I",
        email: "ngovani@example.com",
        age: 33
    },
    {
        id: "c010",
        name: "Đặng Thị K",
        email: "dangthik@example.com",
        age: 30
    },
    {
        id: "c011",
        name: "Bùi Văn L",
        email: "buivanl@example.com",
        age: 40
    },
    {
        id: "c012",
        name: "Võ Thị M",
        email: "vothim@example.com",
        age: 22
    },
    {
        id: "c013",
        name: "Dương Văn N",
        email: "duongvann@example.com",
        age: 45
    },
    {
        id: "c014",
        name: "Lý Thị O",
        email: "lythio@example.com",
        age: 19
    },
    {
        id: "c015",
        name: "Mai Văn P",
        email: "maivanp@example.com",
        age: 27
    },
    {
        id: "c016",
        name: "Đào Thị Q",
        email: "daothiq@example.com",
        age: 36
    },
    {
        id: "c017",
        name: "Hà Văn R",
        email: "havanr@example.com",
        age: 50
    },
    {
        id: "c018",
        name: "Tạ Thị S",
        email: "tathis@example.com",
        age: 23
    },
    {
        id: "c019",
        name: "Lương Văn T",
        email: "luongvant@example.com",
        age: 29
    },
    {
        id: "c020",
        name: "Phùng Thị U",
        email: "phungthiu@example.com",
        age: 31
    },
];

const products = [
    {
        id: "p001",
        name: "Điện thoại",
        price: 7000000,
        quantity: 100
    },
    {
        id: "p002",
        name: "Laptop",
        price: 15000000,
        quantity: 50
    },
    {
        id: "p003",
        name: "Máy tính bảng",
        price: 8000000,
        quantity: 80
    },
    {
        id: "p004",
        name: "Tai nghe",
        price: 500000,
        quantity: 200
    },
    {
        id: "p005",
        name: "Chuột không dây",
        price: 300000,
        quantity: 150
    },
    {
        id: "p006",
        name: "Bàn phím cơ",
        price: 1200000,
        quantity: 60
    },
    {
        id: "p007",
        name: "Màn hình",
        price: 4000000,
        quantity: 70
    },
    {
        id: "p008",
        name: "Ổ cứng SSD",
        price: 2000000,
        quantity: 90
    },
    {
        id: "p009",
        name: "Pin dự phòng",
        price: 600000,
        quantity: 110
    },
    {
        id: "p010",
        name: "Loa Bluetooth",
        price: 1500000,
        quantity: 85
    },
    {
        id: "p011",
        name: "Cáp sạc nhanh",
        price: 150000,
        quantity: 300
    },
    {
        id: "p012",
        name: "Củ sạc nhanh",
        price: 250000,
        quantity: 250
    },
    {
        id: "p013",
        name: "Đế tản nhiệt Laptop",
        price: 450000,
        quantity: 120
    },
    {
        id: "p014",
        name: "Lót chuột cỡ lớn",
        price: 200000,
        quantity: 180
    },
    {
        id: "p015",
        name: "Giá đỡ điện thoại",
        price: 100000,
        quantity: 220
    },
    {
        id: "p016",
        name: "Webcam Full HD",
        price: 850000,
        quantity: 95
    },
    {
        id: "p017",
        name: "Micro thu âm",
        price: 1300000,
        quantity: 65
    },
    {
        id: "p018",
        name: "Hub chuyển đổi USB-C",
        price: 650000,
        quantity: 140
    },
    {
        id: "p019",
        name: "Túi chống sốc Laptop",
        price: 350000,
        quantity: 160
    },
    {
        id: "p020",
        name: "Đèn LED treo màn hình",
        price: 750000,
        quantity: 105
    }
];

const orders = [
    {
        id: "o001",
        customerId: "c001",
        productId: "p002",
        quantity: 1,
        totalPrice: 15000000
    },
    {
        id: "o002",
        customerId: "c003",
        productId: "p001",
        quantity: 2,
        totalPrice: 14000000
    },
    {
        id: "o003",
        customerId: "c002",
        productId: "p005",
        quantity: 3,
        totalPrice: 900000
    },
    {
        id: "o004",
        customerId: "c005",
        productId: "p004",
        quantity: 2,
        totalPrice: 1000000
    },
    {
        id: "o005",
        customerId: "c004",
        productId: "p007",
        quantity: 1,
        totalPrice: 4000000
    },
    {
        id: "o006",
        customerId: "c006",
        productId: "p003",
        quantity: 1,
        totalPrice: 8000000
    },
    {
        id: "o007",
        customerId: "c008",
        productId: "p006",
        quantity: 2,
        totalPrice: 2400000
    },
    {
        id: "o008",
        customerId: "c007",
        productId: "p009",
        quantity: 1,
        totalPrice: 600000
    },
    {
        id: "o009",
        customerId: "c009",
        productId: "p008",
        quantity: 1,
        totalPrice: 2000000
    },
    {
        id: "o010",
        customerId: "c010",
        productId: "p010",
        quantity: 1,
        totalPrice: 1500000
    },
    {
        id: "o011",
        customerId: "c011",
        productId: "p012",
        quantity: 2,
        totalPrice: 500000
    },
    {
        id: "o012",
        customerId: "c012",
        productId: "p014",
        quantity: 1,
        totalPrice: 200000
    },
    {
        id: "o013",
        customerId: "c015",
        productId: "p002",
        quantity: 1,
        totalPrice: 15000000
    },
    {
        id: "o014",
        customerId: "c013",
        productId: "p016",
        quantity: 2,
        totalPrice: 1700000
    },
    {
        id: "o015",
        customerId: "c016",
        productId: "p018",
        quantity: 1,
        totalPrice: 650000
    },
    {
        id: "o016",
        customerId: "c004",
        productId: "p011",
        quantity: 3,
        totalPrice: 450000
    },
    {
        id: "o017",
        customerId: "c018",
        productId: "p015",
        quantity: 2,
        totalPrice: 200000
    },
    {
        id: "o018",
        customerId: "c019",
        productId: "p020",
        quantity: 1,
        totalPrice: 750000
    },
    {
        id: "o019",
        customerId: "c020",
        productId: "p009",
        quantity: 2,
        totalPrice: 1200000
    },
    {
        id: "o020",
        customerId: "c017",
        productId: "p017",
        quantity: 1,
        totalPrice: 1300000
    }
];
export {
    customers,
    orders,
    products
}