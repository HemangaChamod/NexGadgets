# NexGadget – eCommerce Platform

🚀 **Live Demo:**  
👉 http://nexgadget-frontend.s3-website.eu-north-1.amazonaws.com

NexGadget is a **fully functional eCommerce web application** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**.  

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

---

## ✨ Key Features

### 🔐 User Authentication (JWT)
- Secure user registration and login system
- Passwords are hashed before storage
- JSON Web Tokens (JWT) are used for session management
- Protected routes for authenticated users and admins

### 🛍️ Product Catalogue & Product Details
- View a list of available products
- Detailed product pages with:
  - Product images
  - Descriptions
  - Prices
- Data is dynamically fetched from the backend API

### 🛒 Dynamic Shopping Cart
- Add products to cart
- Update item quantities
- Remove items from the cart
- Cart state is preserved during the session
- Real-time price calculations before checkout

---

### 💳 Stripe Payment Integration
- Secure online payments using **Stripe (Test Mode)**
- Backend handles payment intent creation

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

- **Full CRUD operations for products**
  - Create new products
  - Update existing products
  - Delete products
- Centralized order management
  - View all orders
  - Update order statuses 


