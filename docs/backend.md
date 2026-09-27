# Backend Documentation

## Overview

NOVA. is a mini e-commerce full stack platform. It gives users the ability to login, browse products, see product details with variants and stock, add products to cart, add products to wishlist, update quantities and variants, remove products, and complete the checkout and order confirmation process.

I used React and CSS for the frontend, Node.js and Express for the backend, and PostgreSQL for the database. I used Prisma to connect and work with the database from the backend.

## Backend Technology

### Node.js

I chose Node.js because I work with JavaScript, and it gives me the ability to build server-side applications and REST APIs.

### Express.js

I chose Express.js because it is a minimal framework for Node.js and lets me organize routes, middlewares, and controllers.

### Render

I used Render to deploy and host the backend as a Web Service.

## Backend Architecture

I used a simple layered architecture to separate responsibilities in the backend.

The request flow is:

Route → Controller → Service → Prisma → Database

- Route defines the endpoint and its middlewares.
- Controller handles the request and response.
- Service contains the business logic.
- Prisma communicates with the PostgreSQL database.

I didn't add Repository Layer because the project is small, and it add extra complexity without a real need for this project.

## API Structure

I used `/api/v1` as the base path for the APIs, and I separated the routes by resource, like auth, products, cart, wishlist, and orders.

I also used a consistent response structure for success and error responses.

## Authentication

I used JWT for authentication with two tokens: Access Token and Refresh Token.

After successful login, backend returns short-lived Access Token and stores the Refresh Token in HttpOnly cookie.

The Access Token is used to access protected routes. When it expire, Refresh Token used to generate new Access Token without requiring the user to login again.

I used HttpOnly cookie for Refresh Token so it can't be accessed directly by JavaScript

When user logout, backend clears the Refresh Token cookie.

## Validation and Error Handling

I used validation middleware with Zod to validate request data like body and params before the request moves to the controller.

I also used a global error handler to handle errors in one place instead of handling them separately in every controller.

The error handler manages validation errors, JWT errors, Prisma errors, and returns appropriate HTTP status code and consistent error response.

I used catchAsync to handle errors from async controllers and pass them to the global error handler without repeating try/catch in every controller.

## Cart and Wishlist

I kept the cart and wishlist business logic inside the service layer to keep the controllers simple.

For cart operations, I validate product, variant, quantity, and available stock before changing the cart.

## Checkout and Order Flow

Before creating order, backend checks cart and available stock. I used a Prisma transaction to create order and order items, decrease the stock, and clear the cart as one operation.

I also used a conditional stock update to check that enough stock is still available before decreasing it. This helps protect checkout from concurrent requests.

## Products

The products are read-only in this project. The backend provides APIs to get all products and get a single product with its variants and stock.

I return the variants with the product data so the frontend has the information needed for product details, variant selection, and stock availability.

## Security and Key Decisions

The user password is stored as a password hash in the database. During login, I used bcrypt to compare the entered password with the stored password hash.

Protected routes require valid Access Token before the user can access cart, wishlist, and order operations.

I used CORS to allow requests only from the frontend application.

### API Endpoints

Base URL: `https://mini-ecommerce-c2ad.onrender.com/api/v1`

**Authentication**

- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`

**Products**

- `GET /products`
- `GET /products/:id`

**Cart**

- `GET /cart`
- `POST /cart/items`
- `PATCH /cart/items/:itemId`
- `DELETE /cart/items/:itemId`

**Wishlist**

- `GET /wishlist`
- `POST /wishlist/items`
- `DELETE /wishlist/items/:productId`

**Orders**

- `POST /orders`