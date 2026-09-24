import prisma from "../config/db.js";

export const getAllProducts = async () => {
  return prisma.product.findMany({
    include: {
      variants: true,
    },
  });
};

export const getProductById = (id) => {
  return prisma.product.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      variants: true,
    },
  });
};