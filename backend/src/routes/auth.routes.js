import { Router } from "express";
import {
  login,
  refresh,
  logout,
} from "../controllers/auth.controller.js";

import validate from "../middlewares/validate.js";
import { loginSchema } from "../validations/auth.validation.js";

const router = Router();

router.post(
  "/login",
  validate({ body: loginSchema }),
  login
);

router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;