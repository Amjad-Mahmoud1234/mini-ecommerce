import { z } from "zod";

const productIdSchema = z.object({
  id: z.coerce
    .number()
    .int("Product ID must be an integer")
    .positive("Product ID must be a positive integer"),
});

export {
  productIdSchema,
};