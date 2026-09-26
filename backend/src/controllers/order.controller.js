import catchAsync from "../utils/catchAsync.js";
import { placeOrder } from "../services/order.service.js";

export const createOrder = catchAsync(
  async (req, res) => {
    const order = await placeOrder(
      req.user.id
    );

    res.status(201).json({
      status: "success",
      message: "Order placed successfully",
      data: {
        order,
      },
    });
  }
);