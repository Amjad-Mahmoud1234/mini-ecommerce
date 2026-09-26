import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.js";

import {
  getWishlist,
  addWishlistItem,
  removeWishlistItem,
} from "../controllers/wishlist.controller.js";

import {
  productIdSchema,
} from "../validations/wishlist.validation.js";

const router = Router();

router.use(protect);

router.get("/", getWishlist);

router.post(
  "/items",
  validate({ body: productIdSchema }),
  addWishlistItem
);

router.delete(
  "/items/:productId",
  validate({ params: productIdSchema }),
  removeWishlistItem
);

export default router;