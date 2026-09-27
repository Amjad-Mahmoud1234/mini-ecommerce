import { z } from "zod";

const productIdSchema = z.object({
  id: z.coerce.number({
    error: "Product ID must be a number",
  })
    .int("Product ID must be an integer")
    .positive("Product ID must be a positive integer"),
});

export {
  productIdSchema,
};