# Frontend Documentation

## Overview

NOVA. is a mini e-commerce full stack platform. It gives users the ability to login, browse products, see product details with variants and stock, add products to cart, add products to wishlist, update quantities and variants, remove products, and complete the checkout and order confirmation process.

I used React and CSS for the frontend, Node.js and Express for the backend, and PostgreSQL for the database. I used Prisma to connect and work with the database from the backend.

## Live Website

[NOVA. Live Website](https://mini-ecommerce-gcq0.onrender.com)

**Test User**

Email: `test@example.com`  
Password: `Password123!`

## Frontend Technology

### React

I chose React to build the frontend because it allows me to split the user interface into reusable components and manage the application state.

### Vite

I used Vite to create and run the React application during development.

### CSS

I used CSS to build the design and make the application responsive for different screen sizes.

### Render

I used Render to deploy and host the frontend as a Static Site.

## Frontend Structure

I organized frontend into pages, components, and services to keep the code clear and separated.

Pages represent the main application screens, while reusable UI parts are separated into components.

I used shared components like Navbar, Footer, ProductCard and loading spinner across the application to avoid repeating same UI code.

I used services to keep API requests separated from the UI components.

## Routing and Protected Routes

I used React Router to manage navigation between the application pages.

I used protected routes to prevent users from accessing cart, wishlist, checkout, and order confirmation pages without login.

If the user is not authenticated, the application redirects the user to the login page.

I used React Helmet Async to manage the title and favicon for the application pages.

## API Integration and Authentication

I used Axios to communicate with backend APIs.

After login, I store the Access Token and user information in localStorage.

I used Axios interceptor to include Access Token in protected API requests.

If Access Token expires, interceptor tries to get a new Access Token using Refresh Token cookie and repeats the original request.

## State Management

I used React state to manage the application data inside components.

I didn't use Redux or another global state management library because project is small and the current state can be managed without adding extra complexity.

## Loading and Error Handling

I added loading states while waiting for API responses so user knows that data is loading.

I also handle API errors and show appropriate messages when an operation fails.

I used a reusable loading spinner instead of creating a different loading UI for every page.

## Responsive Design

I used CSS media queries to make the application responsive for different screen sizes.

I adjusted layouts, navigation, product cards, cart, and other UI elements to work on desktop, tablet, and mobile screens.