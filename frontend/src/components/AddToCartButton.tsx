"use client";

import { useState } from "react";
import { apiPost } from "@/lib/api";
import type { Cart } from "@/lib/types";

export default function AddToCartButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);

  async function addToCart() {
    try {
      setLoading(true);
      const cart = await apiPost<Cart>("/api/cart/add", { productId, qty: 1 });      
      window.dispatchEvent(new CustomEvent("cart:update", { detail: cart }));
      window.dispatchEvent(new Event("cart:open"));
    } catch (err) {
      alert("Erro ao adicionar ao carrinho.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={addToCart}
      disabled={loading}
      className="mt-4 w-full rounded-md bg-black px-4 py-2 text-white font-medium hover:bg-gray-800 disabled:opacity-50"
    >
      {loading ? "Adicionando..." : "Adicionar ao carrinho"}
    </button>
  );
}
