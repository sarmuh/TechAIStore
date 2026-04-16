import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "../components/AuthProvider";
import { ThemeProvider } from "../components/ThemeProvider"; // <-- Buni qo'shdik

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TechStore - AI E-commerce",
  description: "AI yordamida aqlli xarid",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          {/* ThemeProvider butun saytni o'rab oladi */}
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}