import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
  getWishlist,
  addWishlistItem,
  removeWishlistItem,
} from "../controllers/wishlist.controller.js";

const router = Router();

router.use(protect);

router.get("/", getWishlist);
router.post("/items", addWishlistItem);
router.delete("/items/:productId", removeWishlistItem);

export default router;