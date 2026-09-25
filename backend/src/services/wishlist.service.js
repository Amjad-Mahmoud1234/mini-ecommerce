import prisma from "../config/db.js";
import AppError from "../utils/AppError.js";

export const getUserWishlist = async (userId) => {
    const wishlistItems = await prisma.wishlistItem.findMany({
      where: {
        userId,
      },
      select: {
        product: {
          select: {
            id: true,
            title: true,
            price: true,
            imageUrl: true,
            stock: true,
            variants: {
              select: {
                id: true,
                name: true,
                stock: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  
    return wishlistItems.map((item) => item.product);
  };

  export const addProductToWishlist = async (userId, productId) => {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(productId),
      },
    });
  
    if (!product) {
      throw new AppError("Product not found", 404);
    }
  
    const existingItem = await prisma.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId: Number(productId),
        },
      },
    });
  
    if (existingItem) {
      throw new AppError("Product is already in wishlist", 409);
    }
  
    await prisma.wishlistItem.create({
      data: {
        userId,
        productId: Number(productId),
      },
    });
  };
  
  export const removeProductFromWishlist = async (
    userId,
    productId
  ) => {
    const wishlistItem = await prisma.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId: Number(productId),
        },
      },
    });
  
    if (!wishlistItem) {
      return null;
    }
  
    await prisma.wishlistItem.delete({
      where: {
        id: wishlistItem.id,
      },
    });
  
    return true;
  };