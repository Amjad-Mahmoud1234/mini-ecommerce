import { readFileSync } from "node:fs";
import bcrypt from "bcrypt";
import prisma from "../src/config/db.js";

const productsUrl = new URL(
  "../src/data/products.json",
  import.meta.url
);

const products = JSON.parse(
  readFileSync(productsUrl, "utf-8")
);

async function main() {
  // Seed test user
  const existingUser = await prisma.user.findUnique({
    where: {
      email: "test@example.com",
    },
  });

  if (!existingUser) {
    const passwordHash = await bcrypt.hash(
      "Password123!",
      12
    );

    await prisma.user.create({
      data: {
        email: "test@example.com",
        passwordHash,
      },
    });
  }

  // Seed products
  for (const product of products) {
    if (
      !Array.isArray(product.variants) ||
      product.variants.length === 0
    ) {
      throw new Error(
        `Product "${product.title}" must have at least one variant`
      );
    }

    const existingProduct =
      await prisma.product.findFirst({
        where: {
          title: product.title,
        },
      });

    if (existingProduct) continue;

    await prisma.product.create({
      data: {
        title: product.title,
        description: product.description,
        price: product.price,
        imageUrl: product.image,

        variants: {
          create: product.variants.map(
            (variant) => ({
              name: variant.name,
              stock: variant.stock,
            })
          ),
        },
      },
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });