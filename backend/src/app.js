import express from 'express';
import cookieParser from 'cookie-parser';
import productsRoutes from './routes/product.routes.js';
import authRoutes from './routes/auth.routes.js';
import { globalErrorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

app.use('/api/v1/products', productsRoutes);
app.use("/api/v1/auth", authRoutes);

app.use(globalErrorHandler);

export default app;
