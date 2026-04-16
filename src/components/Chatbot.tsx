"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Loader2 } from "lucide-react";
import { useCart } from "../store/useCart"; // Savat ma'lumotlarini olish uchun

// Xabarlar tipi
type Message = { role: "user" | "assistant"; content: string };

export default function Chatbot() {
  const { items } = useCart(); // Savatdagi barcha narsalarni ajratib olamiz
  
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Assalomu alaykum! Men TechStore AI maslahatchisiman. Sizga qanday texnika kerak?" }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Yangi xabar kelganda avtomatik eng pastga skroll qilish
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Xabarni yuborish logikasi
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput("");
    
    // Foydalanuvchi xabarini UI ga qo'shamiz
    const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMsg, 
          history: newMessages.slice(0, -1), // Oxirgi yozilganidan oldingi tarix
          cartContext: items // SAVAT MA'LUMOTLARINI AI GA YUBORAMIZ
        }),
      });

      const data = await res.json();
      
      if (res.ok && data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        throw new Error("Xatolik");
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Kechirasiz, aloqada xatolik yuz berdi. Iltimos keyinroq urinib ko'ring." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chatni ochish tugmasi (O'ng pastki burchakda) */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:bg-indigo-700 hover:scale-110 transition-all z-40 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare className="w-7 h-7" />
      </button>

      {/* Chat Oynasi */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-[360px] h-[550px] rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 
                       bg-white border-gray-200 border
                       dark:bg-[#151A2D] dark:border-white/10 dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
          >
            {/* --- HEADER --- */}
            <div className="p-4 flex justify-between items-center transition-colors
                            bg-indigo-600 text-white
                            dark:bg-indigo-500/20 dark:backdrop-blur-md dark:border-b dark:border-white/10">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-1.5 rounded-lg dark:bg-indigo-500/30">
                  <Bot className="w-5 h-5 text-white dark:text-indigo-300" />
                </div>
                <span className="font-bold text-white dark:text-indigo-100">AI Maslahatchi</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="hover:bg-white/20 dark:hover:bg-white/10 p-1.5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white dark:text-indigo-200" />
              </button>
            </div>

            {/* --- XABARLAR MAYDONI --- */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm transition-colors
                            bg-gray-50 
                            dark:bg-[#0B0F19]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm
                                  ${msg.role === "user" 
                                    ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300" 
                                    : "bg-indigo-600 text-white dark:bg-indigo-500 dark:text-white"}`}>
                    {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Xabar matni */}
                  <div className={`p-3.5 rounded-2xl max-w-[75%] leading-relaxed shadow-sm
                                  ${msg.role === "user" 
                                    ? "bg-indigo-600 text-white rounded-tr-none dark:bg-indigo-500" 
                                    : "bg-white border border-gray-200 text-gray-800 rounded-tl-none dark:bg-[#1E2337] dark:border-white/5 dark:text-slate-200"}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {/* Yuklanish (Typing) effekti */}
              {loading && (
                <div className="flex gap-3 flex-row">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-indigo-600 text-white dark:bg-indigo-500">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3.5 rounded-2xl rounded-tl-none bg-white border border-gray-200 dark:bg-[#1E2337] dark:border-white/5">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-500 dark:text-indigo-400" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* --- KIRITISH (INPUT) MAYDONI --- */}
            <div className="p-4 border-t transition-colors flex gap-2
                            bg-white border-gray-100 
                            dark:bg-[#151A2D] dark:border-white/10">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Savolingizni yozing..."
                className="flex-1 px-4 py-3 rounded-xl border outline-none transition-colors
                           bg-gray-50 border-gray-200 focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-400
                           dark:bg-[#0B0F19] dark:border-white/10 dark:text-white dark:placeholder-slate-500 dark:focus:ring-indigo-500"
              />
              <button 
                onClick={handleSend} 
                disabled={!input.trim() || loading}
                className="p-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed
                           bg-indigo-600 text-white hover:bg-indigo-700
                           dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}