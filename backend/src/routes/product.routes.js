import { Router } from "express";
import {
  getProducts,
  getProductById,
} from "../controllers/product.controller.js";

import validate from "../middlewares/validate.js";
import { productIdSchema } from "../validations/product.validation.js";

const router = Router();

router.get("/", getProducts);

router.get(
  "/:id",
  validate({ params: productIdSchema }),
  getProductById
);

export default router;