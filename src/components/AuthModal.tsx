"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Forma state'lari
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        // --- LOGIN LOGIKASI ---
        const res = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (res?.error) {
          setError(res.error);
        } else {
          onClose(); // Muvaffaqiyatli kirsa, oynani yopamiz
        }
      } else {
        // --- REGISTRATSIYA LOGIKASI ---
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Xatolik yuz berdi");
        } else {
          // Ro'yxatdan o'tgach, darhol login qilamiz
          await signIn("credentials", { redirect: false, email, password });
          onClose();
        }
      }
    } catch (err) {
      setError("Tarmoq xatosi. Qaytadan urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Orqa fon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal oyna */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            <div className="p-8">
              <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                {isLogin ? "Xush kelibsiz!" : "Ro'yxatdan o'tish"}
              </h2>
              <p className="text-gray-500 mb-8">
                {isLogin ? "Hisobingizga kiring va aqlli xaridlarni davom ettiring." : "Yangi hisob yarating va AI tavsiyalaridan foydalaning."}
              </p>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium mb-6 text-center border border-red-100">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Ismingiz"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition bg-gray-50 focus:bg-white"
                    />
                  </div>
                )}

                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="Email manzil"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition bg-gray-50 focus:bg-white"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    placeholder="Parol"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition bg-gray-50 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 flex justify-center items-center h-14"
                >
                  {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (isLogin ? "Tizimga kirish" : "Ro'yxatdan o'tish")}
                </button>
              </form>

              <div className="mt-8 text-center text-sm text-gray-500">
                {isLogin ? "Hisobingiz yo'qmi? " : "Allaqachon hisobingiz bormi? "}
                <button
                  onClick={() => { setIsLogin(!isLogin); setError(""); }}
                  className="font-bold text-indigo-600 hover:text-indigo-800 transition"
                >
                  {isLogin ? "Ro'yxatdan o'ting" : "Tizimga kiring"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}