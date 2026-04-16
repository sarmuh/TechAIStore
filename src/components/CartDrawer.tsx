"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Trash2, CreditCard, CheckCircle, Loader2, ArrowLeft } from "lucide-react";
import { useCart } from "../store/useCart";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, clearCart } = useCart();
  
  // To'lov bosqichlarini boshqarish: "cart" -> "payment" -> "success"
  const [step, setStep] = useState<"cart" | "payment" | "success">("cart");
  const [isProcessing, setIsProcessing] = useState(false);

  // Karta ma'lumotlari (UI uchun)
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Oyna yopilganda holatni asl holiga qaytarish
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setStep("cart"), 300);
    }
  }, [isOpen]);

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Sun'iy kechikish (API so'rovini imitatsiya qilamiz)
    setTimeout(() => {
      setIsProcessing(false);
      setStep("success");
      clearCart(); // To'lov o'tgach savatni tozalaymiz
      setCardNumber(""); setExpiry(""); setCvv("");
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Orqa qora fon (Overlay) */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Savat Oynasi */}
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md shadow-2xl z-[101] flex flex-col transition-colors duration-300
                       bg-white dark:bg-[#0B0F19] border-l border-gray-200 dark:border-white/10"
          >
            {/* Header */}
            <div className="p-6 border-b flex justify-between items-center transition-colors
                            border-gray-100 dark:border-white/10 bg-white dark:bg-[#0B0F19]">
              <div className="flex items-center gap-3">
                {step === "payment" ? (
                  <button onClick={() => setStep("cart")} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors text-gray-600 dark:text-slate-300">
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                ) : (
                  <div className="bg-indigo-100 dark:bg-indigo-500/20 p-2 rounded-xl text-indigo-600 dark:text-indigo-400">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                )}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {step === "payment" ? "To'lov" : step === "success" ? "Xarid" : "Savat"}
                </h2>
              </div>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/10">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Asosiy qism */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50 dark:bg-[#05060A] transition-colors relative">
              
              <AnimatePresence mode="wait">
                
                {/* 1. SAVAT QISMI */}
                {step === "cart" && (
                  <motion.div key="cart" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                    {items.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-64 text-gray-400 dark:text-slate-500">
                        <ShoppingBag className="w-16 h-16 mb-4 opacity-50" />
                        <p className="text-lg font-medium">Savatingiz bo'sh</p>
                      </div>
                    ) : (
                      items.map((item) => (
                        <motion.div layout key={item.id} className="flex gap-4 bg-white dark:bg-[#151A2D] p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 relative group transition-colors">
                          <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-xl p-2 flex items-center justify-center flex-shrink-0">
                            <img src={item.imageUrl} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                          </div>
                          <div className="flex-1 pr-8">
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm line-clamp-2">{item.name}</h4>
                            <p className="text-indigo-600 dark:text-indigo-400 font-black mt-1">${item.price}</p>
                            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Soni: {item.quantity} ta</p>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </motion.div>
                      ))
                    )}
                  </motion.div>
                )}

                {/* 2. TO'LOV QISMI */}
                {step === "payment" && (
                  <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                    <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 p-6 rounded-2xl text-white shadow-xl mb-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                      <CreditCard className="w-8 h-8 mb-4 text-white/80" />
                      <p className="text-sm text-indigo-100 mb-1">To'lov summasi</p>
                      <h3 className="text-3xl font-black">${total}</h3>
                    </div>

                    <form onSubmit={handlePaymentSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">Karta raqami</label>
                        <input type="text" required maxLength={19} placeholder="0000 0000 0000 0000" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border outline-none transition-colors bg-white dark:bg-[#151A2D] border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500" />
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1">
                          <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">Amal qilish muddati</label>
                          <input type="text" required maxLength={5} placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border outline-none transition-colors bg-white dark:bg-[#151A2D] border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500" />
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">CVV</label>
                          <input type="password" required maxLength={3} placeholder="•••" value={cvv} onChange={(e) => setCvv(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border outline-none transition-colors bg-white dark:bg-[#151A2D] border-gray-200 dark:border-white/10 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500" />
                        </div>
                      </div>
                      
                      <button type="submit" disabled={isProcessing} className="w-full mt-6 bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition flex justify-center items-center gap-2 shadow-lg dark:shadow-indigo-500/20 disabled:opacity-70">
                        {isProcessing ? <><Loader2 className="w-5 h-5 animate-spin" /> Ishlanmoqda...</> : `To'lash ($${total})`}
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* 3. MUVAFFAQIYATLI TO'LOV QISMI */}
                {step === "success" && (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-full text-center mt-20">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="w-24 h-24 bg-green-100 dark:bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                      <CheckCircle className="w-12 h-12" />
                    </motion.div>
                    <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">To'lov qabul qilindi!</h3>
                    <p className="text-gray-500 dark:text-slate-400 mb-8 max-w-[250px] mx-auto">Sizning so'rovingiz muvaffaqiyatli amalga oshirildi. Xaridingiz uchun rahmat!</p>
                    <button onClick={onClose} className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                      Do'konga qaytish
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Footer (Faqat 1-bosqichda ko'rinadi) */}
            {step === "cart" && items.length > 0 && (
              <div className="p-6 border-t transition-colors bg-white dark:bg-[#0B0F19] border-gray-100 dark:border-white/10 shadow-[0_-10px_20px_rgba(0,0,0,0.02)] dark:shadow-none">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500 dark:text-slate-400 font-medium">Umumiy summa:</span>
                  <span className="text-3xl font-black text-gray-900 dark:text-white">${total}</span>
                </div>
                <button onClick={() => setStep("payment")} className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg dark:shadow-[0_0_20px_rgba(99,102,241,0.3)] mb-4">
                  To'lovga o'tish
                </button>
                <button onClick={clearCart} className="w-full text-center text-gray-500 dark:text-slate-400 font-medium hover:text-red-500 dark:hover:text-red-400 transition-colors">
                  Savatni tozalash
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}