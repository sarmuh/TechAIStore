"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Search, ShoppingBag, ShoppingCart, User, LogOut, Sun, Moon } from "lucide-react";
import { useCart } from "../store/useCart";
import { useSession, signOut } from "next-auth/react"; 
import { useTheme } from "next-themes"; // <-- Tungi rejim uchun
import CartDrawer from "./CartDrawer";
import AuthModal from "./AuthModal";
import Chatbot from "./Chatbot"; 

type Product = { id: number; name: string; description: string; price: number; category: string; imageUrl: string; };
type AIResponse = { title: string; description: string; products: Product[]; };

export default function Storefront({ initialProducts }: { initialProducts: Product[] }) {
  const { data: session } = useSession();
  const aiBlockRef = useRef<HTMLDivElement>(null);
  
  // Rejimni boshqarish
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []); // Hydration error ni oldini olish uchun
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false); 
  const { items, addItem } = useCart();
  
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [aiData, setAiData] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const categories = ["All", ...Array.from(new Set(initialProducts.map(p => p.category)))];

  const filteredProducts = initialProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelect = async (product: Product) => {
    setSelectedProduct(product);
    setAiData(null);
    setLoading(true);

    setTimeout(() => { aiBlockRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }, 150);

    try {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentProductId: product.id }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Xatolik");
      setAiData(data);
    } catch (error) {
      setAiData({ title: "Kechirasiz", description: "Ayni vaqtda AI tavsiyalari ishlamayapti.", products: [] });
    } finally {
      setLoading(false);
    }
  };

  return (
    // Asosiy orqa fon dark rejimida to'q rangga kiradi
    <div className="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-[#0B0F19] py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* --- HEADER QISMI --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 relative z-10">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white transition-colors">
              Tech<span className="text-indigo-600 dark:text-indigo-400">Store</span>
            </h1>
            <p className="mt-1 text-gray-500 dark:text-slate-400 transition-colors">AI yordamida aqlli xarid</p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto items-center">
            {/* Qidiruv */}
            <div className="relative flex-1 md:w-80 hidden sm:block">
              <Search className="absolute left-3 top-3 text-gray-400 dark:text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Mahsulot qidirish..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border outline-none shadow-sm transition-colors
                           bg-white border-gray-200 focus:ring-indigo-500 text-gray-900 
                           dark:bg-[#151A2D] dark:border-white/10 dark:text-white dark:focus:ring-indigo-400"
              />
            </div>

            {/* Dark/Light Toggle Tugmasi */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-3 rounded-xl border shadow-sm transition-colors
                           bg-white border-gray-200 text-gray-700 hover:text-indigo-600 hover:border-indigo-500
                           dark:bg-[#151A2D] dark:border-white/10 dark:text-slate-300 dark:hover:text-indigo-400 dark:hover:border-indigo-400"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}

            {/* Savat Tugmasi */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 rounded-xl border shadow-sm transition-colors group
                         bg-white border-gray-200 hover:border-indigo-500
                         dark:bg-[#151A2D] dark:border-white/10 dark:hover:border-indigo-400"
            >
              <ShoppingBag className="w-5 h-5 text-gray-700 dark:text-slate-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white dark:border-[#0B0F19]">
                  {items.length}
                </span>
              )}
            </button>

            {/* Login / Profil */}
            {session ? (
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl border shadow-sm transition-colors
                              bg-white border-gray-200 
                              dark:bg-[#151A2D] dark:border-white/10">
                <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold uppercase
                                bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
                  {session.user?.name?.charAt(0) || "U"}
                </div>
                <span className="font-medium hidden lg:block text-gray-700 dark:text-slate-200">{session.user?.name}</span>
                <button 
                  onClick={() => signOut()} 
                  className="p-1 ml-1 transition-colors text-gray-400 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center gap-2 px-5 py-3 rounded-xl shadow-sm font-medium transition-colors
                           bg-indigo-600 text-white hover:bg-indigo-700
                           dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                <User className="w-5 h-5" /> <span className="hidden sm:block">Kirish</span>
              </button>
            )}
          </div>
        </div>

        {/* --- KATEGORIYALAR --- */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium transition-all shadow-sm border ${
                activeCategory === cat 
                  ? "bg-indigo-600 text-white border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500" 
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-100 dark:bg-[#151A2D] dark:text-slate-300 dark:border-white/10 dark:hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- ASOSIY MAHSULOTLAR (GRID) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -5 }}
              className={`rounded-2xl shadow-sm border overflow-hidden flex flex-col transition-all duration-300
                ${selectedProduct?.id === product.id 
                  ? "ring-2 ring-indigo-600 border-indigo-600 dark:ring-indigo-400 dark:border-indigo-400" 
                  : "border-gray-100 dark:border-white/5 hover:border-gray-300 dark:hover:border-white/20"}
                bg-white dark:bg-[#13182b]`}
            >
              <div 
                onClick={() => handleSelect(product)} 
                className="h-48 flex items-center justify-center p-4 cursor-pointer relative group transition-colors
                           bg-gray-50 dark:bg-white/5"
              >
                <img src={product.imageUrl} alt={product.name} className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">{product.category}</p>
                  <h3 className="mt-1 text-lg font-bold line-clamp-1 text-gray-900 dark:text-white">{product.name}</h3>
                  <p className="mt-3 text-xl font-black text-gray-900 dark:text-white">${product.price}</p>
                </div>
                <button 
                  onClick={() => addItem({ ...product, quantity: 1 })}
                  className="mt-4 w-full py-2.5 rounded-xl font-semibold flex justify-center items-center gap-2 transition-colors
                             bg-gray-900 text-white hover:bg-gray-800
                             dark:bg-indigo-600 dark:hover:bg-indigo-700"
                >
                  <ShoppingCart className="w-4 h-4" /> Savatga
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- AI TAVSIYALAR BLOKI --- */}
        <div ref={aiBlockRef} className="scroll-mt-10">
          <AnimatePresence>
            {selectedProduct && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 60 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="rounded-3xl shadow-2xl overflow-hidden relative text-white bg-slate-900 dark:bg-[#0c101d] dark:border dark:border-white/10"
              >
                {/* ... AI bloki ichi o'zgarishsiz qoladi, u doim to'q rangda chiroyli ko'rinadi ... */}
                <div className="absolute top-0 right-0 p-8 opacity-10 blur-2xl">
                  <Sparkles className="w-64 h-64 text-indigo-500" />
                </div>

                <div className="p-8 md:p-10 relative z-10">
                  <div className="flex items-start gap-4 mb-8">
                    <div className="bg-indigo-600/20 p-3 rounded-xl border border-indigo-500/30 shrink-0">
                      <Sparkles className="w-8 h-8 text-indigo-400 animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold">
                        {loading ? "AI tahlil qilmoqda..." : aiData?.title}
                      </h2>
                      <p className="text-slate-300 mt-2 text-lg max-w-3xl leading-relaxed">
                        {loading ? "Siz tanlagan uskuna imkoniyatlari o'rganilmoqda va eng yaxshi aksessuarlar tanlanmoqda..." : aiData?.description}
                      </p>
                    </div>
                  </div>

                  {loading ? (
                    <div className="flex justify-center py-12">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                        <span className="text-indigo-300 font-medium animate-pulse">Katalogni qidirmoqda...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      {aiData?.products?.map((rec, index) => (
                        <motion.div key={rec.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-slate-800 dark:bg-[#151A2D] border border-slate-700 dark:border-white/10 rounded-2xl p-5 flex gap-5 items-center hover:bg-slate-700/80 transition-colors">
                          <div className="w-24 h-24 bg-white/5 rounded-xl p-2 flex-shrink-0 border border-white/10">
                            <img src={rec.imageUrl} alt={rec.name} className="w-full h-full object-contain" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider">{rec.category}</p>
                            <h4 className="text-lg font-bold mt-1 line-clamp-1">{rec.name}</h4>
                            <div className="mt-3 flex items-center justify-between">
                              <span className="text-xl font-bold text-white">${rec.price}</span>
                              <button onClick={() => addItem({ ...rec, quantity: 1 })} className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-600 transition flex items-center gap-2">
                                <ShoppingCart className="w-4 h-4" /> Qo'shish
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* UI MODALLARI VA CHATBOT */}
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        {session && <Chatbot />} 

      </div>
    </div>
  );
}