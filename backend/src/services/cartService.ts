import { Cart } from "../types";
import products from "../data/products.json";
import { effectivePrice } from "../utils/pricing";

type AnyItem = {
  productId: string;
  qty: number;
  name?: string;
  imageUrl?: string;
  price?: number;
  promoPrice?: number;
  lineTotal?: number;
};

let cart: Cart = { items: [], subTotal: 0 };

const normalizeAndRecalc = () => {
  const byId = new Map<string, AnyItem>();
  for (const it of cart.items as AnyItem[]) {
    const current = byId.get(it.productId);
    if (current) current.qty += it.qty;
    else byId.set(it.productId, { productId: it.productId, qty: it.qty });
  }

  const consolidated = Array.from(byId.values()).filter((i) => i.qty > 0);


  const enriched = consolidated.map((it) => {
    const product = (products as any[]).find((pr) => pr.id === it.productId);
    if (!product) return it;

    const unit = effectivePrice(product);
    return {
      ...it,
      name: product.name,
      imageUrl: product.imageUrl,
      price: product.price,
      promoPrice: product.promoPrice,
      lineTotal: unit * it.qty,
    };
  });

  const sub = enriched.reduce((sum, it) => sum + (it.lineTotal ?? 0), 0);

  cart.items = enriched as any;
  cart.subTotal = sub;
};

export const CartService = {
  getCart() {
    normalizeAndRecalc();
    return cart;
  },

  add(productId: string, qty: number = 1) {
    if (!productId || !Number.isFinite(qty) || qty === 0) return cart;

    const idx = cart.items.findIndex((i) => i.productId === productId);
    if (idx >= 0) {
      cart.items[idx].qty += qty;
    } else {
      cart.items.push({ productId, qty });
    }

    normalizeAndRecalc();
    return cart;
  },

  remove(productId: string) {
    cart.items = cart.items.filter((i) => i.productId !== productId);
    normalizeAndRecalc();
    return cart;
  },
};
