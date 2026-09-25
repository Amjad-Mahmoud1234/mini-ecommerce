import express from 'express';
import productsRoutes from './routes/product.routes.js';
import { globalErrorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

app.use('/api/v1/products', productsRoutes);

app.use(globalErrorHandler);

export default app;
