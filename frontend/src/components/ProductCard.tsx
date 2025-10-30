import Link from "next/link";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const hasPromo = typeof product.promoPrice === "number";
  const price = (n: number) =>
    n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-md"
    >

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.imageUrl}
        alt={product.name}
        className="aspect-[4/3] w-full object-cover transition group-hover:scale-[1.02]"
      />

      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="line-clamp-1 text-sm font-medium text-gray-900">
          {product.name}
        </h3>

        <div className="mt-auto flex items-center gap-2">
          {hasPromo ? (
            <>
              <span className="text-base font-semibold text-emerald-600">
                {price(product.promoPrice!)}
              </span>
              <span className="text-xs text-gray-400 line-through">
                {price(product.price)}
              </span>
              <span className="ml-auto rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                Promoção
              </span>
            </>
          ) : (
            <span className="text-base font-semibold text-gray-900">
              {price(product.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
