import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Barcha maydonlarni to'ldiring" }, { status: 400 });
    }

    // 1. Foydalanuvchi oldin ro'yxatdan o'tganmi tekshiramiz
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Bu email allaqachon band" }, { status: 400 });
    }

    // 2. Parolni shifrlaymiz (hash)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Yangi foydalanuvchini bazaga saqlaymiz
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "Muvaffaqiyatli ro'yxatdan o'tdingiz!" }, { status: 201 });
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json({ error: "Xatolik yuz berdi" }, { status: 500 });
  }
}