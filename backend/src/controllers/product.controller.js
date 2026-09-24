import { getAllProducts, getProductById as findProductById } from "../services/product.service.js";

export const getProducts = (req, res) => {
    const products = getAllProducts();
  
    res.status(200).json({
      status: "success",
      results: products.length,
      data: products,
    });
  };

  export const getProductById = (req, res) => {
    const product = findProductById(req.params.id);
  
    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }
  
    res.status(200).json({
      status: "success",
      data: product,
    });
  };