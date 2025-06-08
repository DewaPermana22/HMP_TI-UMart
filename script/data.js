const productsData = [
    {
        id: 1,
        name: "Produk IPHONE Termurah Penyimpanan TT Kondisi Baru",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop",
        currentPrice: "Rp. 4.250.999",
        originalPrice: "Rp. 4.999.000",
        discount: "15%",
        variant: ["64GB", "128GB", "256GB"],
        color: [
            {
                "name": "Deep Purple", 
                "hex": "#5F2C82"
            },
            {
                "name": "Pro Purple", 
                "hex": "#9D7CD8"
            },
            {
                "name": "Blue", 
                "hex": "#1E3A8A"
            },
            {
                "name": "Starlight", 
                "hex": "#F5F5DC"
            }
        ],
        rating: 4.0,
        reviewCount: 45
    },
    {
        id: 2,
        name: "Topi Kobay, Cocok Dipakai Wanita Juga Pria",
        image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=300&h=200&fit=crop",
        currentPrice: "Rp. 39.999",
        originalPrice: "Rp. 65.000",
        variant: ["XL", "L", "M", "S"],
        color: [],
        discount: "35%",
        rating: 4.5,
        reviewCount: 60
    },
    {
        id: 3,
        name: "Wadah Yang Dirakil Dengan Anyaman Bambu",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
        currentPrice: "Rp. 3.999",
        originalPrice: "Rp. 5.499",
        discount: "20%",
        variant: ["Kecil", "Sedang", "Besar"],
        color: [],
        rating: 4.2,
        reviewCount: 30
    },
    {
        id: 4,
        name: "Kacamata Desain Modern Untuk Semua Gaya Nyaman Dan Keren",
        image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=300&h=200&fit=crop",
        currentPrice: "Rp. 19.999",
        originalPrice: "Rp. 30.768",
        discount: "35%",
        variant: ["Bundar", "Kotak", "Oval"],
        color: [],
        rating: 4.8,
        reviewCount: 45
    },
    {
        id: 5,
        name: "Jaket Hodiah Terbaik untuk Diri Sendiri atau Orang Tersayang",
        image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=200&fit=crop",
        currentPrice: "Rp. 99.845",
        originalPrice: "Rp. 154.500",
        discount: "35%",
        variant: ["S", "M", "L", "XL"],
        color: [
            {
                "name": "Merah",
                "hex": "#DC2626"
            },
            {
                "name": "Biru",
                "hex": "#2563EB"
            },
            {
                "name": "Hitam",
                "hex": "#000000"
            },
            {
                "name": "Putih",
                "hex": "#FFFFFF"
            }
        ],
        rating: 4.0,
        reviewCount: 120
    },
    {
        id: 6,
        name: "Topi Dan Wadah Dari Anyaman Bambu Untuk Disawah dan Di",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
        currentPrice: "Rp. 8.999",
        originalPrice: "Rp. 15.999",
        discount: "20%",
        variant: ["Kecil", "Sedang", "Besar"],
        color: [],
        rating: 4.6,
        reviewCount: 48
    },
    {
        id: 7,
        name: "Headset Bluetooth Variant Warna D035 | Pro Max",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop",
        currentPrice: "Rp. 95.999",
        originalPrice: "Rp. 190.000",
        discount: "15%",
        variant: [],
        color: [
            {
                "name": "Merah",
                "hex": "#DC2626"
            },
            {
                "name": "Biru",
                "hex": "#2563EB"
            },
            {
                "name": "Hitam",
                "hex": "#000000"
            },
            {
                "name": "Putih",
                "hex": "#FFFFFF"
            }
        ],
        rating: 4.0,
        reviewCount: 89
    },
    {
        id: 8,
        name: "Jas Tampil Percaya Diri, Jas yang Memancarkan Kharisma.",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=200&fit=crop",
        currentPrice: "Rp. 199.999",
        originalPrice: "Rp. 268.500",
        discount: "35%",
        variant: ["S", "M", "L", "XL"],
        color: [
            {
                "name": "Merah",
                "hex": "#DC2626"
            },
            {
                "name": "Biru",
                "hex": "#2563EB"
            },
            {
                "name": "Hitam",
                "hex": "#000000"
            },
            {
                "name": "Putih",
                "hex": "#FFFFFF"
            }
        ],
        rating: 5.0,
        reviewCount: 156
    },
    {
        id: 9,
        name: "Sepatu Sneakers Casual Untuk Gaya Sehari-hari",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=300&h=200&fit=crop",
        currentPrice: "Rp. 129.999",
        originalPrice: "Rp. 199.999",
        discount: "35%",
        variant: ["38", "39", "40", "41", "42", "43"],
        color: [
            {
                "name": "Hitam",
                "hex": "#000000"
            },
            {
                "name": "Putih",
                "hex": "#FFFFFF"
            },
            {
                "name": "Abu-abu",
                "hex": "#6B7280"
            }
        ],
        rating: 4.3,
        reviewCount: 87
    },
    {
        id: 10,
        name: "Tas Ransel Laptop Anti Air Multifungsi",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop",
        currentPrice: "Rp. 85.000",
        originalPrice: "Rp. 120.000",
        discount: "30%",
        variant: ["15 inch", "17 inch"],
        color: [
            {
                "name": "Hitam",
                "hex": "#000000"
            },
            {
                "name": "Navy",
                "hex": "#1E3A8A"
            },
            {
                "name": "Abu-abu",
                "hex": "#6B7280"
            }
        ],
        rating: 4.7,
        reviewCount: 142
    },
    {
        id: 11,
        name: "Jam Tangan Digital Sport Tahan Air",
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=200&fit=crop",
        currentPrice: "Rp. 75.999",
        originalPrice: "Rp. 95.000",
        discount: "20%",
        variant: [],
        color: [
            {
                "name": "Hitam",
                "hex": "#000000"
            },
            {
                "name": "Biru",
                "hex": "#2563EB"
            },
            {
                "name": "Merah",
                "hex": "#DC2626"
            }
        ],
        rating: 4.4,
        reviewCount: 76
    },
    {
        id: 12,
        name: "Kemeja Lengan Panjang Formal Bisnis",
        image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=300&h=200&fit=crop",
        currentPrice: "Rp. 89.999",
        originalPrice: "Rp. 135.000",
        discount: "33%",
        variant: ["S", "M", "L", "XL", "XXL"],
        color: [
            {
                "name": "Putih",
                "hex": "#FFFFFF"
            },
            {
                "name": "Biru Muda",
                "hex": "#3B82F6"
            },
            {
                "name": "Pink",
                "hex": "#EC4899"
            }
        ],
        rating: 4.6,
        reviewCount: 93
    },
    {
        id: 13,
        name: "Speaker Bluetooth Portable Bass Mantap",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=200&fit=crop",
        currentPrice: "Rp. 149.999",
        originalPrice: "Rp. 229.000",
        discount: "35%",
        variant: [],
        color: [
            {
                "name": "Hitam",
                "hex": "#000000"
            },
            {
                "name": "Biru",
                "hex": "#2563EB"
            },
            {
                "name": "Merah",
                "hex": "#DC2626"
            }
        ],
        rating: 4.8,
        reviewCount: 201
    },
    {
        id: 14,
        name: "Dompet Kulit Asli Pria Premium",
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=200&fit=crop",
        currentPrice: "Rp. 69.999",
        originalPrice: "Rp. 99.000",
        discount: "29%",
        variant: [],
        color: [
            {
                "name": "Coklat",
                "hex": "#92400E"
            },
            {
                "name": "Hitam",
                "hex": "#000000"
            }
        ],
        rating: 4.5,
        reviewCount: 68
    },
    {
        id: 15,
        name: "Celana Jeans Slim Fit Berkualitas Tinggi",
        image: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=300&h=200&fit=crop",
        currentPrice: "Rp. 119.999",
        originalPrice: "Rp. 179.000",
        discount: "33%",
        variant: ["28", "30", "32", "34", "36"],
        color: [
            {
                "name": "Dark Blue",
                "hex": "#1E3A8A"
            },
            {
                "name": "Light Blue",
                "hex": "#3B82F6"
            },
            {
                "name": "Black",
                "hex": "#000000"
            }
        ],
        rating: 4.2,
        reviewCount: 154
    },
    {
        id: 16,
        name: "Kaos Polo Shirt Katun Combed Premium",
        image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&h=200&fit=crop",
        currentPrice: "Rp. 59.999",
        originalPrice: "Rp. 85.000",
        discount: "29%",
        variant: ["S", "M", "L", "XL"],
        color: [
            {
                "name": "Navy",
                "hex": "#1E3A8A"
            },
            {
                "name": "Putih",
                "hex": "#FFFFFF"
            },
            {
                "name": "Maroon",
                "hex": "#991B1B"
            },
            {
                "name": "Hijau",
                "hex": "#059669"
            }
        ],
        rating: 4.7,
        reviewCount: 112
    },
    {
        id: 17,
        name: "Mouse Gaming RGB LED Optical 3200 DPI",
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=200&fit=crop",
        currentPrice: "Rp. 45.999",
        originalPrice: "Rp. 75.000",
        discount: "39%",
        variant: [],
        color: [
            {
                "name": "Hitam",
                "hex": "#000000"
            },
            {
                "name": "Putih",
                "hex": "#FFFFFF"
            }
        ],
        rating: 4.6,
        reviewCount: 234
    },
    {
        id: 18,
        name: "Sandal Jepit Karet Nyaman Anti Slip",
        image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=300&h=200&fit=crop",
        currentPrice: "Rp. 25.999",
        originalPrice: "Rp. 39.000",
        discount: "33%",
        variant: ["36", "37", "38", "39", "40", "41", "42"],
        color: [
            {
                "name": "Hitam",
                "hex": "#000000"
            },
            {
                "name": "Biru",
                "hex": "#2563EB"
            },
            {
                "name": "Merah",
                "hex": "#DC2626"
            }
        ],
        rating: 4.1,
        reviewCount: 89
    },
    {
        id: 19,
        name: "Power Bank 20000mAh Fast Charging",
        image: "https://images.unsplash.com/photo-1609592806955-d4368f0ec3d8?w=300&h=200&fit=crop",
        currentPrice: "Rp. 125.999",
        originalPrice: "Rp. 185.000",
        discount: "32%",
        variant: [],
        color: [
            {
                "name": "Hitam",
                "hex": "#000000"
            },
            {
                "name": "Putih",
                "hex": "#FFFFFF"
            }
        ],
        rating: 4.5,
        reviewCount: 167
    },
    {
        id: 20,
        name: "Masker Wajah Korea Collagen Moisturizing",
        image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=200&fit=crop",
        currentPrice: "Rp. 15.999",
        originalPrice: "Rp. 25.000",
        discount: "36%",
        variant: ["1 Pcs", "5 Pcs", "10 Pcs"],
        color: [],
        rating: 4.8,
        reviewCount: 312
    },
    {
        id: 21,
        name: "Botol Minum Stainless Steel 500ml",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=200&fit=crop",
        currentPrice: "Rp. 35.999",
        originalPrice: "Rp. 55.000",
        discount: "35%",
        variant: ["500ml", "750ml", "1L"],
        color: [
            {
                "name": "Silver",
                "hex": "#9CA3AF"
            },
            {
                "name": "Hitam",
                "hex": "#000000"
            },
            {
                "name": "Biru",
                "hex": "#2563EB"
            }
        ],
        rating: 4.4,
        reviewCount: 78
    },
    {
        id: 22,
        name: "Keyboard Gaming Mechanical RGB Backlight",
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=200&fit=crop",
        currentPrice: "Rp. 189.999",
        originalPrice: "Rp. 285.000",
        discount: "33%",
        variant: [],
        color: [
            {
                "name": "Hitam",
                "hex": "#000000"
            },
            {
                "name": "Putih",
                "hex": "#FFFFFF"
            }
        ],
        rating: 4.9,
        reviewCount: 289
    },
    {
        id: 23,
        name: "Hoodie Oversize Unisex Korean Style",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=200&fit=crop",
        currentPrice: "Rp. 89.999",
        originalPrice: "Rp. 135.000",
        discount: "33%",
        variant: ["S", "M", "L", "XL"],
        color: [
            {
                "name": "Hitam",
                "hex": "#000000"
            },
            {
                "name": "Abu-abu",
                "hex": "#6B7280"
            },
            {
                "name": "Cream",
                "hex": "#FEF3C7"
            },
            {
                "name": "Navy",
                "hex": "#1E3A8A"
            }
        ],
        rating: 4.6,
        reviewCount: 198
    },
    {
        id: 24,
        name: "Charger Wireless Fast Charging 15W",
        image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=200&fit=crop",
        currentPrice: "Rp. 55.999",
        originalPrice: "Rp. 89.000",
        discount: "37%",
        variant: [],
        color: [
            {
                "name": "Hitam",
                "hex": "#000000"
            },
            {
                "name": "Putih",
                "hex": "#FFFFFF"
            }
        ],
        rating: 4.3,
        reviewCount: 145
    },
    {
        id: 25,
        name: "Cincin Titanium Anti Alergi Unisex",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=200&fit=crop",
        currentPrice: "Rp. 49.999",
        originalPrice: "Rp. 75.000",
        discount: "33%",
        variant: ["16", "17", "18", "19", "20", "21"],
        color: [
            {
                "name": "Silver",
                "hex": "#9CA3AF"
            },
            {
                "name": "Gold",
                "hex": "#F59E0B"
            },
            {
                "name": "Black",
                "hex": "#000000"
            }
        ],
        rating: 4.7,
        reviewCount: 67
    },
    {
        id: 26,
        name: "Lampu LED Strip RGB 5 Meter Remote Control",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
        currentPrice: "Rp. 65.999",
        originalPrice: "Rp. 99.000",
        discount: "33%",
        variant: ["3 Meter", "5 Meter", "10 Meter"],
        color: [],
        rating: 4.5,
        reviewCount: 156
    },
    {
        id: 27,
        name: "Payung Lipat Otomatis Anti Angin",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop",
        currentPrice: "Rp. 42.999",
        originalPrice: "Rp. 65.000",
        discount: "34%",
        variant: [],
        color: [
            {
                "name": "Hitam",
                "hex": "#000000"
            },
            {
                "name": "Navy",
                "hex": "#1E3A8A"
            },
            {
                "name": "Merah",
                "hex": "#DC2626"
            }
        ],
        rating: 4.2,
        reviewCount: 84
    },
    {
        id: 28,
        name: "Sarung Tangan Kulit Motor Touring",
        image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=300&h=200&fit=crop",
        currentPrice: "Rp. 79.999",
        originalPrice: "Rp. 125.000",
        discount: "36%",
        variant: ["M", "L", "XL"],
        color: [
            {
                "name": "Hitam",
                "hex": "#000000"
            },
            {
                "name": "Coklat",
                "hex": "#92400E"
            }
        ],
        rating: 4.4,
        reviewCount: 92
    },
    {
        id: 29,
        name: "Karpet Bulu Halus Anti Slip 120x160cm",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
        currentPrice: "Rp. 155.999",
        originalPrice: "Rp. 235.000",
        discount: "34%",
        variant: ["100x150cm", "120x160cm", "150x200cm"],
        color: [
            {
                "name": "Cream",
                "hex": "#FEF3C7"
            },
            {
                "name": "Abu-abu",
                "hex": "#6B7280"
            },
            {
                "name": "Coklat",
                "hex": "#92400E"
            }
        ],
        rating: 4.6,
        reviewCount: 178
    },
    {
        id: 30,
        name: "Tempat Pensil Multifungsi Desktop Organizer",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
        currentPrice: "Rp. 29.999",
        originalPrice: "Rp. 45.000",
        discount: "33%",
        variant: [],
        color: [
            {
                "name": "Putih",
                "hex": "#FFFFFF"
            },
            {
                "name": "Pink",
                "hex": "#EC4899"
            },
            {
                "name": "Biru",
                "hex": "#2563EB"
            }
        ],
        rating: 4.3,
        reviewCount: 95
    }
];

const articlesData = [
    {
        id: 1,
        name: "Cara Membuat QRIS All Payment untuk Pelaku Usaha!",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=200&fit=crop",
        description: "Panduan lengkap membuat QRIS yang mendukung semua jenis pembayaran digital. Cocok untuk pelaku usaha yang ingin mempermudah transaksi dengan pelanggan dari berbagai platform.",
        author: "Kirania Kharisa S.",
        authorImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
        role: "Penulis Artikel",
        rating: 4.0,
        liked: "1.3k",
        saved: "1.4k",
    },
    {
        id: 2,
        name: "Simak beberapa cara agar UMKM Kamu Menjadi Go Digital",
        image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=300&h=200&fit=crop",
        description: "Transformasi digital sangat penting bagi UMKM untuk tetap bersaing. Artikel ini membahas langkah-langkah praktis agar UMKM bisa memanfaatkan teknologi dalam menjalankan bisnis.",
        author: "Fahmy Bima Az-Zukhruf",
        authorImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
        role: "Penulis Artikel",
        rating: 4.0,
        liked: "1.4k",
        saved: "1.5k",
    },
    {
        id: 3,
        name: "Cara membangun Usaha dari Nol Agar terhindar dari Gagal",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop",
        description: "Memulai usaha dari nol membutuhkan strategi dan ketekunan. Artikel ini membagikan tips penting agar bisnis kamu tidak mudah tumbang di tengah jalan.",
        author: "Dewa Permana",
        authorImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
        role: "Pengusaha Sukses",
        rating: 4.0,
        liked: "4.3k",
        saved: "12k",
    },
];
