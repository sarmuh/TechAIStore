"use client";

import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Loader2, ShoppingBag, ArrowRight, ShieldCheck, Zap, Cpu, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const emailInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const res = await signIn("credentials", { redirect: false, email, password });
        if (res?.error) setError(res.error);
        else router.push("/store");
      } else {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (!res.ok) setError(data.error || "Xatolik yuz berdi");
        else {
          await signIn("credentials", { redirect: false, email, password });
          router.push("/store");
        }
      }
    } catch (err) {
      setError("Tarmoq xatosi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0B0F19] scroll-smooth selection:bg-indigo-500/30">
      
      {/* ================= CHAP TOMON: SKROLL BO'LADIGAN MA'LUMOTLAR ================= */}
      <div className="lg:flex-1 relative border-b lg:border-b-0 lg:border-r border-white/5">
        
        {/* Chap tomon Orqa fon animatsiyalari */}
        <div className="fixed top-0 left-0 w-1/2 h-full pointer-events-none overflow-hidden z-0">
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600 rounded-full blur-[128px]" />
          <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ repeat: Infinity, duration: 10, delay: 2, ease: "easeInOut" }} className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[128px]" />
        </div>

        {/* --- STICKY HEADER (Qotib turuvchi shisha menyu) --- */}
        <div className="sticky top-0 z-50 pt-6 px-8 lg:px-14 pb-4">
          <motion.nav 
            initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} 
            className="flex items-center justify-between backdrop-blur-xl border border-white/10 bg-white/5 py-4 px-6 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
          >
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 p-2.5 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.5)]">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              
              {/* Animatsiyali TechAIStore yozuvi */}
              <motion.span 
                animate={{ backgroundPosition: ["0%", "200%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-400 bg-[length:200%_auto]"
              >
                TechAIStore
              </motion.span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
              <a href="#home" className="hover:text-white hover:text-shadow-sm transition-all">Bosh sahifa</a>
              <button onClick={() => emailInputRef.current?.focus()} className="hover:text-white transition-all">Do'kon</button>
              <a href="#about" className="hover:text-white transition-all">Biz haqimizda</a>
              <a href="#contact" className="hover:text-white transition-all">Bog'lanish</a>
            </div>
          </motion.nav>
        </div>

        {/* --- SKROLL KONTENT QISMI --- */}
        <div className="relative z-10 px-8 lg:px-14 pb-20">
          {/* 1. ASOSIY QISM (HERO) */}
          <section id="home" className="min-h-[70vh] flex flex-col justify-center mb-20 pt-10">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, type: "spring" }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-bold mb-8 backdrop-blur-md w-max shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
              AI 3.0 Integratsiyasi bilan
            </motion.div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-8">
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="block">
                Kelajak texnikasini
              </motion.span>
              <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x pb-2">
                AI yordamida kashf eting
              </motion.span>
            </h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 1 }} className="text-slate-400 text-lg lg:text-xl font-medium leading-relaxed max-w-2xl mb-12">
              Sizning shaxsiy sun'iy intellekt maslahatchingiz sizga eng mos uskunalar va e-commerce dunyosidagi eng yaxshi aksessuarlarni topishga yordam beradi.
            </motion.p>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-white/10 pt-10 max-w-3xl">
              <div>
                <p className="text-4xl font-black text-white">20k<span className="text-indigo-500">+</span></p>
                <p className="text-slate-500 text-sm mt-2 font-medium uppercase tracking-wider">Xursand mijozlar</p>
              </div>
              <div>
                <p className="text-4xl font-black text-white">99<span className="text-indigo-500">%</span></p>
                <p className="text-slate-500 text-sm mt-2 font-medium uppercase tracking-wider">AI Aniqligi</p>
              </div>
              <div className="hidden md:block">
                <p className="text-4xl font-black text-white">24/7</p>
                <p className="text-slate-500 text-sm mt-2 font-medium uppercase tracking-wider">Aqlli yordam</p>
              </div>
            </motion.div>
          </section>

          {/* 2. BIZ HAQIMIZDA */}
          <section id="about" className="min-h-[70vh] py-20 border-t border-white/5">
            <motion.h2 initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-4xl lg:text-5xl font-black text-white mb-6">
              Nima uchun <span className="text-indigo-500">TechStore?</span>
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {[
                { icon: <Cpu className="w-8 h-8 text-indigo-400" />, title: "Aqlli Tavsiyalar", desc: "LLaMA-3 modeliga asoslangan AI sizga 100% mos aksessuarlarni taklif qiladi." },
                { icon: <Zap className="w-8 h-8 text-yellow-400" />, title: "Tezkor Ishlash", desc: "Next.js yordamida sayt chaqmoqdek tez ishlaydi, vaqtingizni tejaydi." },
                { icon: <ShieldCheck className="w-8 h-8 text-green-400" />, title: "Yuqori Xavfsizlik", desc: "Sizning ma'lumotlaringiz eng zamonaviy shifrlash usullari bilan himoyalangan." },
                { icon: <User className="w-8 h-8 text-purple-400" />, title: "Shaxsiy Yondashuv", desc: "Chatbot orqali istalgan texnika bo'yicha to'liq maslahat oling." }
              ].map((feature, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.15 }} className="bg-white/5 border border-white/5 p-8 rounded-3xl backdrop-blur-sm hover:bg-white/10 hover:border-white/10 transition-all">
                  <div className="bg-white/5 border border-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

{/* 3. BOG'LANISH */}
          <section id="contact" className="py-20 border-t border-white/5 relative z-10">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} 
              className="text-4xl lg:text-5xl font-black text-white mb-12"
            >
              Biz bilan <span className="text-[#8B5CF6]">Bog'laning</span>
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Manzilimiz (To'q ko'k / Indigo card) */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} 
                className="bg-[#1e1b4b]/80 border border-indigo-500/30 p-8 rounded-[2rem] flex items-center gap-6 backdrop-blur-md hover:bg-[#1e1b4b] transition-all shadow-lg"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-transparent shrink-0">
                  {/* Ikonkani rasmga moslab aylana ichiga oldik */}
                  <MapPin className="w-10 h-10 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Manzilimiz</h4>
                  <p className="text-slate-300 leading-relaxed font-medium">O'zbekiston, Termiz shahri, IT Park, 10-qavat, TechStore ofisi.</p>
                </div>
              </motion.div>

              {/* Elektron pochta (To'q binafsha / Purple card) */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} 
                className="bg-[#3b0764]/80 border border-purple-500/30 p-8 rounded-[2rem] flex items-center gap-6 backdrop-blur-md hover:bg-[#3b0764] transition-all shadow-lg"
              >
                <div className="w-16 h-16 rounded-full border-2 border-purple-400/50 flex items-center justify-center bg-purple-500/10 shrink-0">
                  <Mail className="w-7 h-7 text-purple-300" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Elektron pochta</h4>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    info@techstore-ai.uz<br/>
                    support@techstore-ai.uz
                  </p>
                </div>
              </motion.div>

            </div>
          </section>
        </div>
      </div>

      {/* ================= O'NG TOMON: WOW LOGIN FORMASI ================= */}
      <div className="lg:w-[500px] xl:w-[600px] relative lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center p-8 lg:p-12 z-20 overflow-hidden bg-[#05060A]">
        
        {/* O'ng tomon WOW Kosmik Foni */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px]" />
          <motion.div animate={{ scale: [1, 1.4, 1], rotate: [0, -90, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute bottom-[-10%] -left-20 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        {/* Shishasimon (Glass) Forma Konteyneri */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="relative z-10 bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          
          <h3 className="text-3xl font-extrabold text-white mb-2">
            {isLogin ? "Xush kelibsiz" : "Ro'yxatdan o'tish"}
          </h3>
          <p className="text-slate-400 mb-8 font-medium">
            {isLogin ? "Davom etish uchun hisobingizga kiring." : "Tizimdan foydalanish uchun hisob yarating."}
          </p>

          {error && (
            <div className="bg-red-500/10 text-red-400 p-4 rounded-xl text-sm font-bold mb-6 border border-red-500/20 flex items-center gap-2 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="relative group">
                <User className="absolute left-4 top-3.5 text-slate-400 w-5 h-5 group-focus-within:text-indigo-400 transition-colors" />
                <input 
                  type="text" placeholder="Ismingiz" required 
                  value={name} onChange={(e) => setName(e.target.value)} 
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-white/10 focus:ring-2 focus:ring-indigo-500 outline-none bg-white/5 text-white placeholder-slate-500 focus:bg-white/10 transition-all shadow-inner" 
                />
              </div>
            )}
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 text-slate-400 w-5 h-5 group-focus-within:text-indigo-400 transition-colors" />
              <input 
                ref={emailInputRef} 
                type="email" placeholder="Email manzil" required 
                value={email} onChange={(e) => setEmail(e.target.value)} 
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-white/10 focus:ring-2 focus:ring-indigo-500 outline-none bg-white/5 text-white placeholder-slate-500 focus:bg-white/10 transition-all shadow-inner" 
              />
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 text-slate-400 w-5 h-5 group-focus-within:text-indigo-400 transition-colors" />
              <input 
                type="password" placeholder="Parol" required 
                value={password} onChange={(e) => setPassword(e.target.value)} 
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-white/10 focus:ring-2 focus:ring-indigo-500 outline-none bg-white/5 text-white placeholder-slate-500 focus:bg-white/10 transition-all shadow-inner" 
              />
            </div>

            <button 
              type="submit" disabled={loading} 
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all flex justify-center items-center h-14 mt-6 group relative overflow-hidden"
            >
              {/* Tugma ichidagi yaltirovchi effekt */}
              <div className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-[45deg] -translate-x-[200%] group-hover:translate-x-[500%] transition-transform duration-700"></div>
              
              {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                <span className="flex items-center gap-2 relative z-10">
                  {isLogin ? "Tizimga kirish" : "Ro'yxatdan o'tish"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </button>
          </form>

          <div className="mt-10 text-center text-sm text-slate-400 font-medium">
            {isLogin ? "Hisobingiz yo'qmi? " : "Allaqachon hisobingiz bormi? "}
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(""); }} 
              className="text-indigo-400 hover:text-indigo-300 font-bold transition-all hover:text-shadow-sm"
            >
              {isLogin ? "Yangi hisob yarating" : "Tizimga kiring"}
            </button>
          </div>
        </motion.div>
      </div>
      
    </div>
  );
}