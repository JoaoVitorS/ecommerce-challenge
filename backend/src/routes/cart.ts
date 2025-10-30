import { Router } from "express";
import { addToCartController, getCartController, removeFromCartController } from "../controllers/cartController";

const router = Router();

router.get("/", getCartController);

router.post("/add", addToCartController);     

router.post("/remove", removeFromCartController);

export default router;
