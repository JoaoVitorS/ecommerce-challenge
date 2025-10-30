import { Product } from '../types';

export const effectivePrice = (product: Product) => product.promoPrice ?? product.price;