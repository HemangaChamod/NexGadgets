import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import AllProductsPage from "./pages/AllProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { Toaster } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import PaymentSuccess from "./pages/PaymentSuccess";
import ProfilePage from './pages/ProfilePage';

import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import ManageUsers from "./pages/ManageUsers";
import ManageProducts from "./pages/ManageProducts";
import ManageOrders from "./pages/ManageOrders";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/myorders" element={<MyOrdersPage />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/profile" element={<ProfilePage />} />

        <Route path="/admin" element={<AdminLayout />}> 
          <Route path="dashboard" element={<AdminDashboard />} /> 
          <Route path="users" element={<ManageUsers />} /> 
          <Route path="products" element={<ManageProducts />} /> 
          <Route path="orders" element={<ManageOrders />} /> 
        </Route>

        </Routes>
        <Toaster position="top-right" reverseOrder={false} />
        <ToastContainer position="top-right" autoClose={3000} />
      </Layout>
    </Router>
  );
}
