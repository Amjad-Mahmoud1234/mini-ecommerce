import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import productsRoutes from './routes/product.routes.js';
import authRoutes from './routes/auth.routes.js';
import wishlistRoutes from "./routes/wishlist.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import { globalErrorHandler } from './middlewares/error.middleware.js';
import AppError from "./utils/AppError.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

app.use('/api/v1/products', productsRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/orders", orderRoutes);

app.all(/.*/, (req, res, next) => {
  next(new AppError("Route not found", 404));
});

app.use(globalErrorHandler);

export default app;
