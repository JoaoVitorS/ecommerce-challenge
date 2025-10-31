"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { apiGet, apiPost } from "@/lib/api";
import type { Cart } from "@/lib/types";
import { X, ShoppingBasket } from "lucide-react";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<Cart>({ items: [], subTotal: 0 });

  async function refresh() {
    const c = await apiGet<Cart>("/api/cart");
    setCart(c);
  }

  useEffect(() => {
    refresh();
    const onUpdate = (e: any) => setCart(e.detail as Cart);
    const onOpen = () => setOpen(true);
    const onClose = () => setOpen(false);

    window.addEventListener("cart:update", onUpdate as EventListener);
    window.addEventListener("cart:open", onOpen);
    window.addEventListener("cart:close", onClose);
    return () => {
      window.removeEventListener("cart:update", onUpdate as EventListener);
      window.removeEventListener("cart:open", onOpen);
      window.removeEventListener("cart:close", onClose);
    };
  }, []);

  async function addOne(productId: string) {
    const c = await apiPost<Cart>("/api/cart/add", { productId, qty: 1 });
    setCart(c);
    window.dispatchEvent(new CustomEvent("cart:update", { detail: c }));
  }

  async function subOne(productId: string) {
    const c = await apiPost<Cart>("/api/cart/add", { productId, qty: -1 });
    setCart(c);
    window.dispatchEvent(new CustomEvent("cart:update", { detail: c }));
  }

  async function removeAll(productId: string, currentQty: number) {
    if (currentQty <= 0) return;
    const c = await apiPost<Cart>("/api/cart/add", { productId, qty: -currentQty });
    setCart(c);
    window.dispatchEvent(new CustomEvent("cart:update", { detail: c }));
  }

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-x-0 top-16 bottom-0 z-40 bg-black/40 transition-opacity ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
     <aside
        className={`fixed right-0 top-16 z-50 w-full max-w-sm
          h-[calc(100dvh-4rem)] bg-[#f9fafb] p-4 shadow-2xl
          transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}
        >
        <header className="flex items-center justify-between border-b pb-2">
          <h2 className="text-lg font-semibold text-gray-900">Carrinho</h2>
          <button onClick={() => setOpen(false)} className="text-sm text-gray-600">
            <X className="h-5 w-5 text-gray-700" aria-placeholder="Icone para fechar"/>
          </button>
        </header>

        <div className="mt-4 space-y-3 overflow-auto pr-1">
          {cart.items.length === 0 && (
            <div className="flex flex-col justify-center items-center h-50rem">
              <p className="text-sm text-gray-500">Seu carrinho está vazio.</p>
              <ShoppingBasket className="h-10 w-10 text-gray-700 mt-5" aria-placeholder="Carrinho de Compras"/>
            </div>
          )}

          {cart.items.map((it) => (
            <div key={it.productId} className="rounded border bg-white p-2">
              <div className="flex items-start gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image
                  width={600}
                  height={400}
                  src={it.imageUrl}
                  alt={it.name}
                  className="h-12 w-12 rounded object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium text-gray-500">{it.name ?? `Produto #${it.productId}`}</div>
                  <div className="text-xs text-gray-600">Quantidade: {it.qty}</div>
                </div>

                <div className="text-sm font-semibold text-gray-500">
                  {(it.lineTotal ?? 0).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <div className="inline-flex overflow-hidden rounded border">
                  <button
                    onClick={() => subOne(it.productId)}
                    className="h-8 w-8 text-gray-700 hover:bg-gray-100"
                  >
                    –
                  </button>
                  <div className="h-8 min-w-10 border-x px-2 text-center text-sm leading-8">
                    <span className="text-gray-500">{it.qty}</span>
                  </div>
                  <button
                    onClick={() => addOne(it.productId)}
                    className="h-8 w-8 text-gray-700 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeAll(it.productId, it.qty)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>

        {cart.items.length !== 0 && (
          <div className="mt-6 flex justify-between border-t pt-4 text-sm">
            <span className="text-gray-800 font-bold text-lg">Total:</span>
            <span className="font-semibold text-gray-700">
              {(cart?.subTotal ?? 0).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
        )}
      </aside>
    </>
  );
}
