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
