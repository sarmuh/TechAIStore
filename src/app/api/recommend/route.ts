import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { PrismaClient } from '@prisma/client';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { currentProductId } = await req.json();
    const products = await prisma.product.findMany();
    const currentProduct = products.find(p => p.id === currentProductId);

    if (!currentProduct) return NextResponse.json({ error: "Topilmadi" }, { status: 404 });

    const catalogContext = products
      .filter(p => p.id !== currentProductId)
      .map(p => `ID: ${p.id}, Nomi: ${p.name}, Xususiyati: ${p.features}`);

    const prompt = `
      Siz e-commerce do'koni uchun AI maslahatchisisiz.
      Foydalanuvchi tanladi: ${currentProduct.name} (${currentProduct.features}).
      Katalogimiz: ${catalogContext.join(' | ')}.
      
      Vazifa: Ushbu mahsulotga eng mos tushuvchi (birga ishlatilsa WOW effekt beradigan) aynan 2 ta mahsulotni tanlang. 
      Natijani QAT'IY ravishda faqat quyidagi JSON formatida qaytaring (hech qanday qo'shimcha so'zlarsiz):
      {
        "title": "Jozibali va qisqa sarlavha (masalan: M3 Max uchun mukammal hamrohlar)",
        "description": "Nima uchun aynan shu 2 ta mahsulotni tavsiya qilayotganingizni 2 ta gap bilan professional tushuntiring. O'zbek tilida.",
        "recommendedIds": [id1, id2]
      }
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'meta-llama/llama-4-scout-17b-16e-instruct',
      temperature: 0.1,
      response_format: { type: "json_object" } // AI faqat JSON qaytarishini ta'minlaymiz
    });

    const aiResponse = JSON.parse(chatCompletion.choices[0]?.message?.content || '{}');
    const recommendedIds = aiResponse.recommendedIds || [];
    
    // Tavsiya etilgan mahsulotlarni obyekti bilan birlashtiramiz
    const recommendedProducts = products.filter(p => recommendedIds.includes(p.id));

    return NextResponse.json({
      title: aiResponse.title || "Tavsiyalar",
      description: aiResponse.description || "Ushbu mahsulotlar sizga mos kelishi mumkin.",
      products: recommendedProducts
    });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Xatolik" }, { status: 500 });
  }
}