import { Request, Response } from "express";
import products from "../data/products.json";

export const getAllProducts = (_req: Request, res: Response) => {
  return res.json(products);
};

export const getProductById = (req: Request, res: Response) => {
  const { id } = req.params;
  const prod = (products as any[]).find(p => p.id === id);
  if (!prod) return res.status(404).json({ message: "Product not found" });
  return res.json(prod);
};
