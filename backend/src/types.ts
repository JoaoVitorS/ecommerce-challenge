export type Product = {
  id: string;
  name: string;
  price: number;
  promoPrice?: number;
  imageUrl: string;
  description: string;
}

export type CartItem = {
  productId: string;
  qty: number;
}

export type Cart = {
  items: CartItem[];
  subTotal: number;
}