import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

import {
  getUserCart,
  addItemToCart,
  updateCartItemById,
  removeCartItemById,
} from "../services/cart.service.js";


export const getCart = catchAsync(
  async (req, res) => {
    const cart = await getUserCart(
      req.user.id
    );

    res.status(200).json({
      status: "success",
      data: cart,
    });
  }
);


export const addCartItem = catchAsync(
  async (req, res, next) => {
    const {
      productId,
      variantId,
      quantity,
    } = req.body;

    if (
      productId === undefined ||
      variantId === undefined ||
      quantity === undefined
    ) {
      return next(
        new AppError(
          "Product ID, variant ID and quantity are required",
          400
        )
      );
    }

    await addItemToCart(
      req.user.id,
      productId,
      variantId,
      quantity
    );

    res.status(201).json({
      status: "success",
      message: "Product added to cart",
    });
  }
);


export const updateCartItem = catchAsync(
  async (req, res, next) => {
    const {
      quantity,
      variantId,
    } = req.body;

    if (
      quantity === undefined &&
      variantId === undefined
    ) {
      return next(
        new AppError(
          "Quantity or variant ID is required",
          400
        )
      );
    }

    await updateCartItemById(
      req.user.id,
      req.params.itemId,
      quantity,
      variantId
    );

    res.status(200).json({
      status: "success",
      message: "Cart item updated",
    });
  }
);


export const removeCartItem = catchAsync(
  async (req, res) => {
    await removeCartItemById(
      req.user.id,
      req.params.itemId
    );

    res.status(204).send();
  }
);