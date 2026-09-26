import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email and password are required")
    .email("Please provide a valid email"),

  password: z
    .string()
    .min(1, "Email and password are required"),
});

export {
  loginSchema,
};