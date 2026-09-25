import {
  getAllProducts,
  getProductById as findProductById,
} from "../services/product.service.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const getProducts = catchAsync(async (req, res) => {
  const products = await getAllProducts();

  res.status(200).json({
    status: "success",
    results: products.length,
    data: products,
  });
});

export const getProductById = catchAsync(async (req, res, next) => {
  const product = await findProductById(req.params.id);

  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: product,
  });
});