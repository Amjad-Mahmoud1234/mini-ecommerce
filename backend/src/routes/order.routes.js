import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { createOrder } from "../controllers/order.controller.js";

const router = Router();

router.use(protect);

router.post("/", createOrder);

export default router;