import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import {
  getUserWishlist,
  addProductToWishlist,
  removeProductFromWishlist,
} from "../services/wishlist.service.js";

export const getWishlist = catchAsync(async (req, res) => {
  const wishlist = await getUserWishlist(req.user.id);

  res.status(200).json({
    status: "success",
    results: wishlist.length,
    data: wishlist,
  });
});

export const addWishlistItem = catchAsync(async (req, res, next) => {
    const { productId } = req.body;
  
    await addProductToWishlist(req.user.id, productId);
  
    res.status(201).json({
      status: "success",
      message: "Product added to wishlist",
    });
  });

  export const removeWishlistItem = catchAsync(
    async (req, res, next) => {
      const removed = await removeProductFromWishlist(
        req.user.id,
        req.params.productId
      );
  
      if (!removed) {
        return next(
          new AppError("Product not found in wishlist", 404)
        );
      }
  
      res.status(204).send();
    }
  );