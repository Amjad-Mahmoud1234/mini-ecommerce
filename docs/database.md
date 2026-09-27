# Database Documentation

## Overview

NOVA. is a mini e-commerce full stack platform. It gives users the ability to login, browse products, see product details with variants and stock, add products to cart, add products to wishlist, update quantities and variants, remove products, and complete the checkout and order confirmation process.

I used React and CSS for the frontend, Node.js and Express for the backend, and PostgreSQL for the database. I used Prisma to connect and work with the database from the backend.

## Database Technology

### PostgreSQL

I chose PostgreSQL because the data in this project is related, for example Cart -> CartItem, Product -> ProductVariant, and User -> Cart.

I used a relational database because this type of database fits the project requirements and makes the relations between the data clear.

One important reason that make me choose a database instead of using in-memory storage like a JSON file is that I need transactions in the Place Order process. The transaction helps me make the order operations work together, and if one operation fails, the changes rollback.

### Prisma

I used Prisma to work with PostgreSQL from the backend because it makes working with the database easier and more organized.

I also used the Prisma schema to define the models and relations, and migrations to manage database changes.

### Neon

I used Neon to host the PostgreSQL database in the cloud. This allows backend to connect to database using connection URL.

## Database Design

I used models like User, Product, ProductVariant, Cart, CartItem, WishlistItem, Order, and OrderItem.

I separated ProductVariant from Product because every product has at least one variant, and each variant can have different stock.

CartItem connects the cart with the product and variant, and store the quantity.

OrderItem saves the product info at the time of order confirmation, so information stay correct even if the product changes later.

## User Design

The User model is simple and only stores the email and password hash for authentication.

Every user can have one cart, many wishlist items, and many orders.

## Price and Stock Design

**Price:** I chose to store the price at the Product level because I wanted all variants of the same product have the same price.

**Stock:** I chose to store the stock at the ProductVariant level because each variant can have different stock. I didn't store stock in Product because I wanted a single source of truth for the stock.

## Cart and Wishlist Design

**Cart:** Every user has one cart, and every product in the cart has a variant and quantity.

I put a unique constraint on (cartId, productId, variantId), so if the user adds the same product with the same variant again, it will not create a duplicate cart item.

**Wishlist:** I put a unique constraint on (userId, productId), so the user cannot add the same product to the wishlist twice.

## Order Design

When checkout is completed, the Order is created with OrderItems that save the product information at that moment, like product name, variant, price, quantity, and subtotal.

So if the product information changes later in the application, the old order information will not change.

## Data Integrity

I didn't only depend on the backend business logic to protect stock and quantity. I also added two constraints at the database level:

- `stock >= 0`
- `quantity > 0`

This gives extra protection for the data if something wrong in the backend.

## Database Transactions

I used Prisma Transaction in the checkout process to make sure the database changes for creating the order, updating the stock, and clearing the cart are completed together.

If any operation fails, all changes are rollback to keep the data consistent.

## Indexing and Performance

I reviewed the queries that I used in the project and I didn't add extra indexes because the primary keys and unique constraints already support the current queries.

## Database Relationships

User (1) ─── (1) Cart

User (1) ─── (N) WishlistItem

User (1) ─── (N) Order

Product (1) ─── (N) ProductVariant

Product (1) ─── (N) CartItem

Product (1) ─── (N) WishlistItem

Product (1) ─── (N) OrderItem

Cart (1) ─── (N) CartItem

ProductVariant (1) ─── (N) CartItem

ProductVariant (1) ─── (N) OrderItem

Order (1) ─── (N) OrderItem
