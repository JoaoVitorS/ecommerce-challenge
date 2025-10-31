import Image from "next/image";
import { Info } from "lucide-react";
import { apiGet } from "@/lib/api";
import type { Product } from "@/lib/types";
import ProductPrice from "@/components/ProductPrice";
import AddToCartButton from "@/components/AddToCartButton";

type Props = { params: Promise<{ id: string }> };

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await apiGet<Product>(`/api/products/${id}`);

  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
         <Image
          width={600}
          height={400}
          src={product.imageUrl}
          alt={product.name}
          className="w-full rounded-lg border object-cover shadow-sm"
        />

        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-3xl font-semibold font-color text-(--color-base)">{product.name}</h1>
          <ProductPrice product={product} />
          <div className="flex items-center space-x-2">
            <Info className="items-center h-4 w-4 text-[#002E5C]" aria-placeholder="Informativo do produto"/>
            <h3 className="text-1xl font-semibold font-color text-[#002E5C]">Sobre o produto</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {product.description ||
              "Descrição indisponível. Este produto ainda não possui detalhes cadastrados."}
          </p>
          <div className="pt-4">
            <AddToCartButton productId={product.id} />
          </div>
        </div>
      </div>
    </main>
  );
}
