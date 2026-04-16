import { PrismaClient } from '@prisma/client';
import Storefront from '../../components/Storefront';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/authOptions"; // <--- IMPORT MANZILI O'ZGARDI
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function StorePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const products = await prisma.product.findMany();

  return (
    <main>
      <Storefront initialProducts={products} />
    </main>
  );
}