import "./globals.css";
import { Roboto } from "next/font/google";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "Stefanini Store",
};

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
