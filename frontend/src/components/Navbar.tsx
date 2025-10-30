"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { apiGet, apiPost } from "@/lib/api";
import type { Cart } from "@/lib/types";
import { Search, User, ShoppingBag, Star } from "lucide-react";

export default function Navbar() {
  const [qty, setQty] = useState(0);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<Cart>({ items: [], subTotal: 0 });


  const refresh = async () => {
    const c = await apiGet<Cart>("/api/cart");
    setCart(c);
  };

  useEffect(() => {
    refresh();
    const onUpdate = (e: any) => setCart(e.detail);
    const onOpen = () => setOpen(true);
    window.addEventListener("cart:update", onUpdate as EventListener);
    window.addEventListener("cart:open", onOpen);
    return () => {
      window.removeEventListener("cart:update", onUpdate as EventListener);
      window.removeEventListener("cart:open", onOpen);
    };
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const c = await apiGet<Cart>("/api/cart");
        setQty(c.items.reduce((s, i) => s + i.qty, 0));
      } catch {}
    };
    load();

    const onUpdate = (e: any) => {
      const c: Cart = e.detail;
      setQty(c.items.reduce((s, i) => s + i.qty, 0));
    };
    window.addEventListener("cart:update", onUpdate as EventListener);
    return () => window.removeEventListener("cart:update", onUpdate as EventListener);
  }, []);

  const openCart = () => window.dispatchEvent(new Event("cart:open"));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-gray-200 bg-[#f9fafb] backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 text-indigo-500" />
          <Link href="/" className="text-lg font-semibold text-gray-900">
            Stefanini Store
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <button
            aria-label="Cart"
            onClick={openCart}
            className="relative rounded-full border border-gray-300 p-2 hover:border-indigo-500 transition"
          >
            <ShoppingBag className="h-4 w-4 text-gray-700" />
            {qty > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-semibold text-white">
                {qty}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
