# NexGadget – MERN Stack eCommerce Platform

🚀 **Live Demo:**  
👉 http://nexgadget-frontend.s3-website.eu-north-1.amazonaws.com

NexGadget is a **fully functional eCommerce web application** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**.  
It provides a complete **customer-facing shopping experience** along with a powerful **admin dashboard** for managing products and orders.

The application is **securely deployed on AWS**, using **EC2 for backend services** and **S3 for frontend hosting**, ensuring scalability, performance, and reliability.  
Online payments are handled securely via **Stripe (test mode)**.

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- React Router
- Stripe Checkout
- Hosted on **AWS S3**

### Backend
- Node.js
- Express.js
- JWT Authentication
- Stripe API
- Hosted on **AWS EC2**

### Database
- MongoDB (MongoDB Atlas)

### Cloud & DevOps
- AWS EC2 – Backend API hosting
- AWS S3 – Static frontend hosting
- Environment-based configuration for security

---

## ✨ Key Features

### 🔐 User Authentication (JWT)
- Secure user registration and login system
- Passwords are hashed before storage
- JSON Web Tokens (JWT) are used for session management
- Protected routes for authenticated users and admins

---

### 🛍️ Product Catalogue & Product Details
- View a list of available products
- Detailed product pages with:
  - Product images
  - Descriptions
  - Prices
- Data is dynamically fetched from the backend API

---

### 🛒 Dynamic Shopping Cart
- Add products to cart
- Update item quantities
- Remove items from the cart
- Cart state is preserved during the session
- Real-time price calculations before checkout

---

### 💳 Stripe Payment Integration
- Secure online payments using **Stripe (Test Mode)**
- Seamless checkout experience
- Backend handles payment intent creation
- Ensures safe and reliable transaction processing

---

### 📦 Order Management System
- Orders are created after successful payment
- Order details include:
  - Purchased items
  - Total amount
  - Payment status
- Order data is securely stored in the database

---

### 🛠️ Admin Dashboard
- Admin-only access with protected routes
- **Full CRUD operations for products**
  - Create new products
  - Update existing products
  - Delete products
- Centralized order management
  - View all orders
  - Update order statuses (e.g., Pending, Shipped, Completed)

---

### ☁️ Cloud Deployment with AWS
- **Frontend:** Hosted on AWS S3 as a static website
- **Backend:** Hosted on AWS EC2 instance
- Separation of frontend and backend for scalability
- Environment variables used to protect sensitive credentials


## 🚀 Live Demo Deployed on AWS

🔗 http://nexgadget-frontend.s3-website.eu-north-1.amazonaws.com
