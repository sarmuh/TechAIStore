import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Eski ma'lumotlarni tozalaymiz
  await prisma.product.deleteMany()

  await prisma.product.createMany({
    data: [
      // --- LAPTOPS (Noutbuklar) ---
      {
        name: "MacBook Pro 16 M3 Max",
        description: "Dasturchilar va AI muhandislari uchun eng kuchli noutbuk.",
        price: 3499,
        category: "Laptops",
        imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
        features: "Apple M3 Max, 128GB RAM, Space Black, macOS, ideal for AI training"
      },
      {
        name: "ASUS ROG Zephyrus G14",
        description: "Yilni, o'ta kuchli o'yin va grafik noutbuki.",
        price: 1599,
        category: "Laptops",
        imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
        features: "AMD Ryzen 9, RTX 4060, 14-inch OLED 120Hz, Windows 11"
      },
      {
        name: "Dell XPS 15",
        description: "Premium dizayn va yuqori unumdorlik uyg'unligi.",
        price: 1899,
        category: "Laptops",
        imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80",
        features: "Intel Core i9, RTX 4050, 4K OLED Touch, 32GB RAM"
      },
      {
        name: "Lenovo ThinkPad X1 Carbon",
        description: "Biznes klass uchun afsonaviy, yengil noutbuk.",
        price: 1499,
        category: "Laptops",
        imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
        features: "Intel Core i7, 16GB RAM, 14-inch FHD, o'ta yengil korpus"
      },
      {
        name: "Razer Blade 16",
        description: "O'yin va 3D modellashtirish uchun premium mashina.",
        price: 2699,
        category: "Laptops",
        imageUrl: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80",
        features: "Intel Core i9, RTX 4080, Mini-LED dual-mode display"
      },

      // --- MONITORS (Monitorlar) ---
      {
        name: "Dell UltraSharp 32 4K",
        description: "Dasturlash va dizayn uchun aniq ranglar beruvchi 4K monitor.",
        price: 899,
        category: "Monitors",
        imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
        features: "32-inch 4K, IPS Black panel, USB-C Hub, 90W power delivery"
      },
      {
        name: "LG UltraGear 27 OLED",
        description: "240Hz tezlikka ega o'ta silliq OLED monitor.",
        price: 999,
        category: "Monitors",
        imageUrl: "https://69dfcabc8003341bcb0c3857.imgix.net/hhh/bbb.jpg",
        features: "27-inch OLED, 240Hz, 0.03ms response time, HDMI 2.1"
      },
      {
        name: "Samsung Odyssey G9",
        description: "Ko'p vazifali ishlar uchun 49 dyuymli kavisli ekran.",
        price: 1299,
        category: "Monitors",
        imageUrl: "https://cdn.mediapark.uz/imgs/93f42ba6-aa95-414a-84bf-89f1b7b5a8b6_1.webp",
        features: "49-inch curved, 240Hz, Dual QHD, 1000R curvature"
      },
      {
        name: "Apple Studio Display",
        description: "Mac tizimlari uchun mukammal 5K ekran.",
        price: 1599,
        category: "Monitors",
        imageUrl: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
        features: "27-inch 5K Retina, Center Stage camera, Spatial Audio"
      },

      // --- ACCESSORIES (Aksessuarlar) ---
      {
        name: "Logitech MX Master 3S",
        description: "Ergonomik simsiz sichqoncha, kod yozuvchilar uchun.",
        price: 99,
        category: "Accessories",
        imageUrl: "https://frankfurt.apollo.olxcdn.com/v1/files/3sq06rgjrsuk1-UZ/image",
        features: "Wireless, Ergonomic, Type-C charging, 8K DPI sensor"
      },
      {
        name: "Keychron Q1 Pro",
        description: "Mexanik, simsiz, dasturlashtiriladigan klaviatura.",
        price: 199,
        category: "Accessories",
        imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80",
        features: "Mechanical, Custom switches, Wireless, RGB, Hot-swappable"
      },
      {
        name: "Sony WH-1000XM5",
        description: "Shovqinni bekor qiluvchi premium quloqchinlar.",
        price: 398,
        category: "Accessories",
        imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80",
        features: "Active Noise Cancelling, 30hr battery, Bluetooth 5.2"
      },
      {
        name: "Apple AirPods Pro 2",
        description: "Apple ekotizimi uchun ajoyib simsiz quloqchin.",
        price: 249,
        category: "Accessories",
        imageUrl: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80",
        features: "Spatial Audio, ANC, USB-C, seamless Apple switching"
      },
      {
        name: "Razer DeathAdder V3",
        description: "Kibersport va tezkor harakatlar uchun yengil sichqoncha.",
        price: 149,
        category: "Accessories",
        imageUrl: "https://interbrands.uz/image/cache/catalog/easyphoto/6563/alt_rz01-04630100-r3g1-5-1000x600.jpg",
        features: "Ultralight, 30K Optical Sensor, Ergonomic"
      },
      {
        name: "Elgato Stream Deck MK.2",
        description: "Makrolar va dasturlarni boshqarish paneli.",
        price: 149,
        category: "Accessories",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8IjM6Aa3yIrrbfz8enCUaByAmRBITW_CiUw&s",
        features: "15 customizable LCD keys, smart workflow automation"
      },
      {
        name: "NuPhy Halo75",
        description: "Ajoyib dizaynli simsiz mexanik klaviatura.",
        price: 139,
        category: "Accessories",
        imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80",
        features: "75% layout, PBT keycaps, Bluetooth/2.4Ghz, Mac/Win support"
      },

      // --- COMPONENTS (Komponentlar) ---
      {
        name: "NVIDIA GeForce RTX 4090",
        description: "Sun'iy intellekt va 3D render uchun yirtqich videokarta.",
        price: 1599,
        category: "Components",
        imageUrl: "https://d2vfia6k6wrouk.cloudfront.net/productimages/7629e07e-13a8-4700-bd42-af16013fb16b/images/xlr8-rtx-4090-verto-epic-x-triple-fan-pk.png",
        features: "24GB GDDR6X, DLSS 3.0, Ray Tracing, 16384 CUDA cores"
      },
      {
        name: "Samsung 990 PRO 2TB",
        description: "Katta ma'lumotlar uchun o'ta tezkor PCIe 4.0 SSD.",
        price: 169,
        category: "Components",
        imageUrl: "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?auto=format&fit=crop&w=800&q=80",
        features: "2TB, 7450 MB/s read, PCIe 4.0 NVMe, Heatsink"
      },
      {
        name: "AMD Ryzen 9 7950X",
        description: "16 yadroli kuchli ish stoli protsessori.",
        price: 599,
        category: "Components",
        imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80",
        features: "16 Cores, 32 Threads, 5.7 GHz boost, Zen 4 architecture"
      },
      {
        name: "Corsair RM1000x Power Supply",
        description: "Kuchli tizimlar uchun 1000W barqaror quvvat bloki.",
        price: 189,
        category: "Components",
        imageUrl: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80",
        features: "1000W, 80 PLUS Gold, Fully Modular, Quiet Fan"
      }
    ]
  })

  console.log("20 ta mahsulot bazaga muvaffaqiyatli yozildi! ✅")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })