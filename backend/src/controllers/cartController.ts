import { Request, Response } from "express";
import { CartService } from "../services/cartService";

export const getCartController = (_req: Request, res: Response) => res.json(CartService.getCart());

export const addToCartController = (req: Request, res: Response) => {
  const { productId, qty } = req.body ?? {};
  if (typeof productId !== "string" || !Number.isFinite(Number(qty))) {
    return res.status(400).json({ message: "productId (string) e qty (number) são obrigatórios" });
  }
  const cart = CartService.add(productId, Number(qty));
  res.json(cart);
};

export const removeFromCartController = (req: Request, res: Response) => {
  const { productId } = req.body ?? {};
  if (typeof productId !== "string") {
    return res.status(400).json({ message: "productId é obrigatório" });
  }
  const cart = CartService.remove(productId);
  res.json(cart);
};
