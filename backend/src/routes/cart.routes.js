import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.js";

import {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
} from "../controllers/cart.controller.js";

import {
  cartItemIdSchema,
  addCartItemSchema,
  updateCartItemSchema,
} from "../validations/cart.validation.js";

const router = Router();

router.use(protect);

router.get("/", getCart);

router.post(
  "/items",
  validate({ body: addCartItemSchema }),
  addCartItem
);

router.patch(
  "/items/:itemId",
  validate({
    params: cartItemIdSchema,
    body: updateCartItemSchema,
  }),
  updateCartItem
);

router.delete(
  "/items/:itemId",
  validate({ params: cartItemIdSchema }),
  removeCartItem
);

export default router;