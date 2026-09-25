import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
} from "../controllers/cart.controller.js";

const router = Router();

router.use(protect);

router.get("/", getCart);
router.post("/items", addCartItem);
router.patch("/items/:itemId", updateCartItem);
router.delete("/items/:itemId", removeCartItem);

export default router;