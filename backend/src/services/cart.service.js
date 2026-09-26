import prisma from "../config/db.js";
import AppError from "../utils/AppError.js";

export const getUserCart = async (userId) => {
  const cart = await prisma.cart.findUnique({
    where: {
      userId,
    },
    select: {
      items: {
        select: {
          id: true,
          quantity: true,

          product: {
            select: {
              id: true,
              title: true,
              price: true,
              imageUrl: true,
              variants: {
                select: {
                  id: true,
                  name: true,
                  stock: true,
                },
              },
            },
          },

          variant: {
            select: {
              id: true,
              name: true,
              stock: true,
            },
          },
        },

        orderBy: {
          id: "asc",
        },
      },
    },
  });

  if (!cart) {
    return {
      items: [],
      total: 0,
    };
  }

  const items = cart.items.map((item) => {
    const price = Number(item.product.price);

    const subtotal = Number(
      (price * item.quantity).toFixed(2)
    );

    return {
      ...item,
      subtotal,
    };
  });

  const total = Number(
    items
      .reduce(
        (sum, item) => sum + item.subtotal,
        0
      )
      .toFixed(2)
  );

  return {
    items,
    total,
  };
};

export const addItemToCart = async (
  userId,
  productId,
  variantId,
  quantity
) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },

    include: {
      variants: true,
    },
  });

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  const selectedVariant = product.variants.find(
    (variant) => variant.id === variantId
  );

  if (!selectedVariant) {
    throw new AppError(
      "Invalid variant for this product",
      400
    );
  }

  if (quantity > selectedVariant.stock) {
    throw new AppError("Insufficient stock", 400);
  }

  const cart = await prisma.cart.upsert({
    where: {
      userId,
    },

    update: {},

    create: {
      userId,
    },
  });

  const existingItem =
    await prisma.cartItem.findUnique({
      where: {
        cartId_productId_variantId: {
          cartId: cart.id,
          productId,
          variantId,
        },
      },
    });

  if (existingItem) {
    const newQuantity =
      existingItem.quantity + quantity;

    if (newQuantity > selectedVariant.stock) {
      throw new AppError(
        "Insufficient stock",
        400
      );
    }

    await prisma.cartItem.update({
      where: {
        id: existingItem.id,
      },

      data: {
        quantity: newQuantity,
      },
    });

    return;
  }

  await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      variantId,
      quantity,
    },
  });
};

export const updateCartItemById = async (
  userId,
  itemId,
  quantity,
  variantId
) => {
  const item = await prisma.cartItem.findFirst({
    where: {
      id: itemId,

      cart: {
        userId,
      },
    },

    include: {
      product: {
        include: {
          variants: true,
        },
      },
    },
  });

  if (!item) {
    throw new AppError(
      "Cart item not found",
      404
    );
  }

  const newQuantity =
    quantity !== undefined
      ? quantity
      : item.quantity;

  const newVariantId =
    variantId !== undefined
      ? variantId
      : item.variantId;

  const selectedVariant =
    item.product.variants.find(
      (variant) =>
        variant.id === newVariantId
    );

  if (!selectedVariant) {
    throw new AppError(
      "Invalid variant for this product",
      400
    );
  }

  if (newQuantity > selectedVariant.stock) {
    throw new AppError(
      "Insufficient stock",
      400
    );
  }

  if (newVariantId === item.variantId) {
    await prisma.cartItem.update({
      where: {
        id: item.id,
      },

      data: {
        quantity: newQuantity,
      },
    });

    return;
  }

  // Variant changed.
  // Check whether the target variant already exists in the cart.
  const existingTargetItem =
    await prisma.cartItem.findUnique({
      where: {
        cartId_productId_variantId: {
          cartId: item.cartId,
          productId: item.productId,
          variantId: newVariantId,
        },
      },
    });

  if (existingTargetItem) {
    const mergedQuantity =
      existingTargetItem.quantity + newQuantity;

    if (mergedQuantity > selectedVariant.stock) {
      throw new AppError(
        "Insufficient stock",
        400
      );
    }

    await prisma.$transaction([
      prisma.cartItem.update({
        where: {
          id: existingTargetItem.id,
        },

        data: {
          quantity: mergedQuantity,
        },
      }),

      prisma.cartItem.delete({
        where: {
          id: item.id,
        },
      }),
    ]);

    return;
  }

  await prisma.cartItem.update({
    where: {
      id: item.id,
    },

    data: {
      quantity: newQuantity,
      variantId: newVariantId,
    },
  });
};

export const removeCartItemById = async (
  userId,
  itemId
) => {
  const item = await prisma.cartItem.findFirst({
    where: {
      id: itemId,

      cart: {
        userId,
      },
    },
  });

  if (!item) {
    throw new AppError(
      "Cart item not found",
      404
    );
  }

  await prisma.cartItem.delete({
    where: {
      id: item.id,
    },
  });
};