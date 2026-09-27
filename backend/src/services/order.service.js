import { Prisma } from "@prisma/client";
import prisma from "../config/db.js";
import AppError from "../utils/appError.js";

export const placeOrder = async (userId) => {
  return prisma.$transaction(async (tx) => {
    const cart = await tx.cart.findUnique({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      throw new AppError("Cart is empty", 400);
    }

    let total = new Prisma.Decimal(0);
    const orderItems = [];

    for (const item of cart.items) {
      const subtotal = item.product.price.mul(
        item.quantity
      );

      const stockUpdate =
        await tx.productVariant.updateMany({
          where: {
            id: item.variantId,
            productId: item.productId,
            stock: {
              gte: item.quantity,
            },
          },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });

      if (stockUpdate.count !== 1) {
        throw new AppError(
          `Insufficient stock for ${item.product.title} - ${item.variant.name}`,
          409
        );
      }

      total = total.plus(subtotal);

      orderItems.push({
        productId: item.productId,
        variantId: item.variantId,

        productTitle: item.product.title,
        variantName: item.variant.name,

        unitPrice: item.product.price,
        quantity: item.quantity,
        subtotal,
      });
    }

    const order = await tx.order.create({
      data: {
        userId,
        total,

        items: {
          create: orderItems,
        },
      },
      include: {
        items: true,
      },
    });

    await tx.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    return order;
  });
};