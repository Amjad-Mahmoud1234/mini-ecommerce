import { readFileSync } from "node:fs";
import prisma from "../src/config/db.js";

const productsUrl = new URL("../src/data/products.json", import.meta.url);
const products = JSON.parse(readFileSync(productsUrl, "utf-8"));

async function main() {
  for (const product of products) {
    const existing = await prisma.product.findFirst({
      where: { title: product.title },
    });

    if (existing) {
      continue;
    }

    const hasVariants = product.variants.length > 0;

    await prisma.product.create({
      data: {
        title: product.title,
        description: product.description,
        price: product.price,
        stock: hasVariants ? null : product.stock,
        imageUrl: product.image,
        ...(hasVariants && {
          variants: {
            create: product.variants.map((variant) => ({
              name: variant.name,
              stock: variant.stock,
            })),
          },
        }),
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
