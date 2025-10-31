import { apiGet } from "@/lib/api";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";

type Props = { searchParams: Promise<{ page?: string; per?: string }> };

export default async function HomePage({ searchParams }: Props) {
  const { page: pageStr, per: perStr } = await searchParams;
  const page = Math.max(1, Number(pageStr ?? "1"));
  const per = Math.max(1, Math.min(24, Number(perStr ?? "6"))); // padrão: 6 cards

  const all = await apiGet<Product[]>("/api/products");
  const totalPages = Math.max(1, Math.ceil(all.length / per));
  const start = (Math.min(page, totalPages) - 1) * per;
  const products = all.slice(start, start + per);

  return (
    <>
      <p className="mb-4 text-gray-600">Periféricos Eletrônicos</p>
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </section>

      <Pagination page={page} totalPages={totalPages} per={per} />
    </>
  );
}
