import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Eski ma'lumotlarni tozalaymiz
    await prisma.product.deleteMany({});

    // 30 ta yangi mahsulotni bazaga yozamiz (Endi 'features' bilan)
    await prisma.product.createMany({
      data: [
        // --- NOUTBUKLAR (Laptops) ---
        { 
          name: "MacBook Pro 16 M3 Max", 
          description: "Dasturchilar va 3D dizaynerlar uchun eng kuchli noutbuk. 128GB RAM, 8TB SSD.", 
          price: 3499, category: "Laptops", 
          features: "128GB Unified Memory, 8TB SSD, Liquid Retina XDR",
          imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop" 
        },
        { 
          name: "ASUS ROG Zephyrus G14", 
          description: "Kiberxavfsizlik va o'yinlar uchun ixcham maxluq. RTX 4090 grafikasi.", 
          price: 1599, category: "Laptops", 
          features: "AMD Ryzen 9, RTX 4090, 32GB RAM, 14-inch Nebula Display",
          imageUrl: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=1000&auto=format&fit=crop" 
        },
        { 
          name: "Dell XPS 15 OLED", 
          description: "Premium dizayn va 4K OLED ekran. Mukammal ofis ishlari uchun.", 
          price: 1899, category: "Laptops", 
          features: "Intel Core i9, 32GB RAM, 1TB NVMe, 4K OLED Touch",
          imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1000&auto=format&fit=crop" 
        },
        { 
          name: "Lenovo ThinkPad X1 Carbon", 
          description: "Afsonaviy klaviatura, o'ta yengil vazn. Haqiqiy muhandislar uchun.", 
          price: 1499, category: "Laptops", 
          features: "Intel Core i7, 16GB RAM, 512GB SSD, Ultralight Carbon Fiber",
          imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=1000&auto=format&fit=crop" 
        },
        { 
          name: "Razer Blade 16", 
          description: "Geymerlar orzusi. Qop-qora alyuminiy korpus va 240Hz ekran.", 
          price: 2699, category: "Laptops", 
          features: "Intel i9-13950HX, RTX 4080, 240Hz QHD+ Display",
          imageUrl: "https://images.unsplash.com/photo-1625842268584-8f3296236761?q=80&w=1000&auto=format&fit=crop" 
        },
        { 
          name: "Acer Swift Edge 16", 
          description: "Dunyodagi eng yengil 16 dyuymli OLED noutbuk. AMD Ryzen 7.", 
          price: 1299, category: "Laptops", 
          features: "AMD Ryzen 7 7840U, 16GB RAM, 1TB SSD, 4K OLED 1.2kg",
          imageUrl: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1000&auto=format&fit=crop" 
        },

        // --- MONITORLAR (Monitors) ---
        { 
          name: "LG UltraGear 27' 4K", 
          description: "144Hz, 1ms. Kod yozish va o'yinlar uchun ajoyib monitor.", 
          price: 699, category: "Monitors", 
          features: "27-inch 4K UHD, 144Hz Refresh Rate, Nano IPS, 1ms",
          imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format&fit=crop" 
        },
        { 
          name: "Samsung Odyssey G9 49'", 
          description: "Ultra-keng qayrilgan (curved) monitor. 2 ta ekranni o'rnini bosadi.", 
          price: 1299, category: "Monitors", 
          features: "49-inch Curved, 240Hz, 1ms, Dual QHD Resolution",
          imageUrl: "https://images.unsplash.com/photo-1616763355548-1b606f439fce?q=80&w=1000&auto=format&fit=crop" 
        },
        { 
          name: "Dell UltraSharp 32 4K", 
          description: "Dizaynerlar va rang ustasi bo'lganlar uchun aniq ranglar.", 
          price: 850, category: "Monitors", 
          features: "32-inch 4K USB-C Hub Monitor, 99% sRGB, IPS Black",
          imageUrl: "https://images.unsplash.com/photo-1585792257263-d3b246a4e3a0?q=80&w=1000&auto=format&fit=crop" 
        },
        { 
          name: "ASUS ProArt Display", 
          description: "Calman verified. Professional grafik ishlar uchun yaratilgan.", 
          price: 999, category: "Monitors", 
          features: "27-inch 4K HDR, Calman Verified, 100% sRGB/Rec. 709",
          imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" 
        },
        { 
          name: "BenQ ZOWIE XL2566K", 
          description: "360Hz esports monitor. CS:GO va Valorant o'yinchilari uchun.", 
          price: 599, category: "Monitors", 
          features: "24.5-inch, 360Hz, TN Panel, DyAc⁺ Technology",
          imageUrl: "https://images.unsplash.com/photo-1542393545-10f5cde2c810?q=80&w=1000&auto=format&fit=crop" 
        },

        // --- EHTIYOT QISMLAR (Components) ---
        { 
          name: "NVIDIA GeForce RTX 4090", 
          description: "Sun'iy intellekt va eng og'ir o'yinlar uchun dunyodagi eng kuchli GPU.", 
          price: 1599, category: "Components", 
          features: "24GB GDDR6X, DLSS 3, 16384 CUDA Cores",
          imageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1000&auto=format&fit=crop" 
        },
        { 
          name: "AMD Radeon RX 7900 XTX", 
          description: "NVIDIA ga eng kuchli raqobatchi. 24GB VRAM bilan jihozlangan.", 
          price: 999, category: "Components", 
          features: "24GB GDDR6, AMD RDNA 3 Architecture, Ray Tracing",
          imageUrl: "https://images.unsplash.com/photo-1587202372773-455b9e07f7bc?q=80&w=1000&auto=format&fit=crop" 
        },
        { 
          name: "Intel Core i9-14900K", 
          description: "24 yadro, 6.0 GHz tezlik. Maksimal hisoblash kuchi.", 
          price: 589, category: "Components", 
          features: "24 Cores (8 P-cores + 16 E-cores), Up to 6.0 GHz",
          imageUrl: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=1000&auto=format&fit=crop" 
        },
        { 
          name: "AMD Ryzen 9 7950X3D", 
          description: "3D V-Cache texnologiyasi bilan o'yinlarda eng yuqori FPS.", 
          price: 699, category: "Components", 
          features: "16 Cores, 32 Threads, 144MB Cache, PCIe 5.0",
          imageUrl: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?q=80&w=1000&auto=format&fit=crop" 
        },
        { 
          name: "Samsung 990 PRO 2TB SSD", 
          description: "PCIe 4.0 NVMe. O'ta tezkor xotira (7450 MB/s o'qish tezligi).", 
          price: 189, category: "Components", 
          features: "2TB, NVMe PCIe 4.0, Read: 7450MB/s, Write: 6900MB/s",
          imageUrl: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=1000&auto=format&fit=crop" 
        },
        { 
          name: "Corsair Vengeance 64GB DDR5", 
          description: "6000MHz tezlikdagi operativ xotira, og'ir dasturlar uchun.", 
          price: 215, category: "Components", 
          features: "64GB (2x32GB), DDR5 6000MHz, Intel XMP 3.0",
          imageUrl: "https://images.unsplash.com/photo-1562976540-1502f7594951?q=80&w=1000&auto=format&fit=crop" 
        },

        // --- AKSESSUARLAR (Keyboards & Mice) ---
        { 
          name: "Keychron K2 Wireless", 
          description: "Mexanik klaviatura. Dasturchilar barmoqlari uchun rohat.", 
          price: 99, category: "Accessories", 
          features: "75% Layout, Wireless/Wired, Gateron Brown Switches",
          imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1000&auto=format&fit=crop" 
        },
        { 
          name: "Logitech MX Master 3S", 
          description: "Dunyodagi eng yaxshi ishchi sichqoncha. Silliq skroll va ergonomika.", 
          price: 99, category: "Accessories", 
          features: "8000 DPI, Quiet Clicks, MagSpeed Scroll, Ergonomic",
          imageUrl: "https://images.unsplash.com/photo-1615663245857-ac63bb5c10ed?q=80&w=1000&auto=format&fit=crop" 
        },
        { 
          name: "Logitech MX Keys Advanced", 
          description: "Yorqin podsvetkali va o'ta jim ishlaydigan aqlli klaviatura.", 
          price: 119, category: "Accessories", 
          features: "Perfect Stroke Keys, Smart Illumination, Multi-Device",
          imageUrl: "https://images.unsplash.com/photo-1588508065123-287b28e01b26?q=80&w=1000&auto=format&fit=crop" 
        },
        { 
          name: "Razer DeathAdder V3 Pro", 
          description: "Ultra-yengil simsiz esports sichqonchasi.", 
          price: 149, category: "Accessories", 
          features: "63g Ultra-lightweight, Focus Pro 30K Optical Sensor",
          imageUrl: "https://images.unsplash.com/photo-1629131726169-56c59610f607?q=80&w=1000&auto=format&fit=crop" 
        },
        { 
          name: "Wooting 60HE", 
          description: "Analog magnitli svitchlarga ega tezkor klaviatura.", 
          price: 175, category: "Accessories", 
          features: "Lekker Magnetic Switches, Rapid Trigger, 60% Layout",
          imageUrl: "https://images.unsplash.com/photo-1618384841590-0536c4b22306?q=80&w=1000&auto=format&fit=crop" 
        },
        { 
          name: "Apple Magic Trackpad", 
          description: "Mac ekotizimi uchun imo-ishoralarni qo'llab-quvvatlovchi trekpad.", 
          price: 129, category: "Accessories", 
          features: "Multi-Touch surface, Force Touch, Wireless",
          imageUrl: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1000&auto=format&fit=crop" 
        },

        // --- AUDIO VA QULOQCHINLAR (Audio) ---
        { 
          name: "Sony WH-1000XM5", 
          description: "Kodni diqqat bilan yozish uchun eng yaxshi shovqin to'xtatuvchi (ANC) quloqchin.", 
          price: 348, category: "Audio", 
          features: "Industry Leading ANC, 30-hour Battery, Multipoint connection",
          imageUrl: "https://images.unsplash.com/photo-1612444530588-fc894c25cecd?q=80&w=1000&auto=format&fit=crop" 
        },
        { 
          name: "Apple AirPods Pro 2", 
          description: "Apple qurilmalari bilan mukammal integratsiya va ajoyib ovoz.", 
          price: 249, category: "Audio", 
          features: "Active Noise Cancellation, Adaptive Transparency, H2 Chip",
          imageUrl: "https://images.unsplash.com/photo-1606220838315-056192d5e927?q=80&w=1000&auto=format&fit=crop" 
        },
        { 
          name: "HyperX Cloud III Wireless", 
          description: "120 soat zaryad saqlovchi qulay geymerlik quloqchini.", 
          price: 149, category: "Audio", 
          features: "120-hour Battery, Memory Foam Ear Cushions, 53mm Drivers",
          imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop" 
        },
        { 
          name: "Sennheiser Momentum 4", 
          description: "Haqiqiy audiofillar uchun premium ovoz sifati.", 
          price: 379, category: "Audio", 
          features: "Audiophile Sound, 60-hour Battery, Adaptive ANC",
          imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop" 
        },
        { 
          name: "Shure SM7B Mikrofon", 
          description: "Podkast va strimlar uchun afsonaviy professional mikrofon.", 
          price: 399, category: "Audio", 
          features: "Dynamic Vocal Microphone, Flat Frequency Response, Shielding",
          imageUrl: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=1000&auto=format&fit=crop" 
        },
        { 
          name: "Rode Wireless GO II", 
          description: "YouTuberlar uchun ixcham va sifatli simsiz mikrofon tizimi.", 
          price: 299, category: "Audio", 
          features: "Dual Channel Wireless, On-board Recording, 200m Range",
          imageUrl: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1000&auto=format&fit=crop" 
        },
        { 
          name: "Logitech Brio 4K Webcam", 
          description: "Kuzatuv va video qo'ng'iroqlar uchun ultra tiniq veb-kamera.", 
          price: 159, category: "Accessories", 
          features: "4K Ultra HD, HDR, Windows Hello Support, Dual Mics",
          imageUrl: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=1000&auto=format&fit=crop" 
        }
      ]
    });

    return NextResponse.json({ success: true, message: "30 ta yangi mahsulot bazaga muvaffaqiyatli to'ldirildi! 🎉 Do'konga qaytib sahifani yangilang." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Xatolik yuz berdi" }, { status: 500 });
  }
}