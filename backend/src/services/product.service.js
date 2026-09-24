import { readFileSync } from "node:fs";

const productsUrl = new URL("../data/products.json", import.meta.url);
const data = readFileSync(productsUrl, "utf-8");
const products = JSON.parse(data);

export const getAllProducts = () => {
  return products;
};

export const getProductById = (id) => {
  return products.find((product) => product.id === Number(id)) ?? null;
};