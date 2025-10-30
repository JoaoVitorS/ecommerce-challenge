import type { Metadata } from "next";
import { Roboto } from 'next/font/google'
import "./globals.css";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";

export const metadata: Metadata = {
  title: "E-commerce desafio Stefanini",
  description: "E-commerce moderno e elegante",
};

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})
 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={roboto.className}>
      <body className="min-h-dvh bg-gray-50 text-gray-900">
        <Navbar />
        <main className="mx-auto max-w-7xl p-6">{children}</main>
        <CartDrawer />
      </body>
    </html>
  );
}
