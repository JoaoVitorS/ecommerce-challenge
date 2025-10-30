"use client";

import { Product } from "@/lib/types";

export default function ProductPrice({ product }: { product: Product }) {
  const hasPromo = typeof product.promoPrice === "number";

  return (
    <div className="mt-2 flex items-baseline gap-3">
      {hasPromo ? (
        <>
          <span className="text-2xl font-bold text-emerald-600">
            {formatPrice(product.promoPrice!)}
          </span>
          <span className="text-sm line-through text-gray-500">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded">
            Promoção
          </span>
        </>
      ) : (
        <span className="text-2xl font-bold text-gray-500">{formatPrice(product.price)}</span>
      )}
    </div>
  );
}

function formatPrice(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
