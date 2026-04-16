import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/authOptions"; // <--- MANA SHU MANZIL TO'G'RILANDI
import { redirect } from "next/navigation";
import LandingPage from "../components/LandingPage";

export default async function Home() {
  const session = await getServerSession(authOptions);

  // Agar foydalanuvchi allaqachon tizimga kirgan bo'lsa, to'g'ridan-to'g'ri do'konga yuboramiz
  if (session) {
    redirect("/store");
  }

  // Tizimga kirmagan bo'lsa, Katta ekranli ro'yxatdan o'tish sahifasini ko'rsatamiz
  return <LandingPage />;
}