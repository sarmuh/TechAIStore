import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { PrismaClient } from '@prisma/client';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Endi fronteddan 'cartContext' ni ham qabul qilamiz
    const { message, history, cartContext } = await req.json();

    const products = await prisma.product.findMany();
    const catalog = products.map(p => `${p.name} ($${p.price}) - Xususiyatlari: ${p.features}`).join(' | ');

    // Savatdagi ma'lumotlarni matnga aylantiramiz
    const cartInfo = cartContext && cartContext.length > 0
      ? `Hozirda foydalanuvchining savatida quyidagi mahsulotlar bor: ${cartContext.map((c: any) => `${c.name} (${c.quantity} ta)`).join(', ')}.`
      : `Hozirda foydalanuvchining savati bo'sh.`;

    // AI ga savat haqida ma'lumot beramiz
    const systemPrompt = `
      Siz "TechStore" elektronika do'konining aqlli va do'stona sotuvchi-maslahatchisisiz.
      Sizning maqsadingiz mijozlarga to'g'ri texnika tanlashda yordam berish.
      Bizning katalogimizda faqat shu mahsulotlar bor: ${catalog}.
      
      MUHIM MA'LUMOT: ${cartInfo}
      
      Mijozlarga faqat O'ZBEK tilida, qisqa, aniq va foydali javoblar bering. 
      Agar mijoz savatidagi narsalar haqida so'rasa, ularni ko'rib turganingizni ayting va unga mos keladigan qo'shimcha mahsulotlarni (katalogdan) tavsiya qiling.
    `;

    const messages = [
      { role: 'system', content: systemPrompt },
      ...history,
      { role: 'user', content: message }
    ];

    const chatCompletion = await groq.chat.completions.create({
      messages: messages as any,
      model: 'llama-3.1-8b-instant', 
      temperature: 0.5, 
    });

    const reply = chatCompletion.choices[0]?.message?.content || "Kechirasiz, hozir javob bera olmayman.";

    return NextResponse.json({ reply });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Xatolik" }, { status: 500 });
  }
}