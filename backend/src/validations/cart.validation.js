import { z } from "zod";

const cartItemIdSchema = z.object({
  itemId: z.coerce
    .number()
    .int("Cart item ID must be an integer")
    .positive("Cart item ID must be a positive integer"),
});

const addCartItemSchema = z.object({
  productId: z.coerce
    .number()
    .int("Product ID must be an integer")
    .positive("Product ID must be a positive integer"),

  variantId: z.coerce
    .number()
    .int("Variant ID must be an integer")
    .positive("Variant ID must be a positive integer"),

  quantity: z.coerce
    .number()
    .int("Quantity must be an integer")
    .positive("Quantity must be a positive integer"),
});

const updateCartItemSchema = z
  .object({
    quantity: z.coerce
      .number()
      .int("Quantity must be an integer")
      .positive("Quantity must be a positive integer")
      .optional(),

    variantId: z.coerce
      .number()
      .int("Variant ID must be an integer")
      .positive("Variant ID must be a positive integer")
      .optional(),
  })
  .refine(
    (data) =>
      data.quantity !== undefined ||
      data.variantId !== undefined,
    {
      message: "Quantity or variant ID is required",
    }
  );

export {
  cartItemIdSchema,
  addCartItemSchema,
  updateCartItemSchema,
};