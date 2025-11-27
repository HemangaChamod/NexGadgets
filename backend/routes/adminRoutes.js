const express = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

const router = express.Router();

// 📊 Dashboard stats
router.get("/stats", protect, admin, async (req, res) => {
  const users = await User.countDocuments();
  const orders = await Order.countDocuments();
  const products = await Product.countDocuments();
  const revenue = await Order.aggregate([
    { $group: { _id: null, total: { $sum: "$totalPrice" } } },
  ]);
  res.json({ users, orders, products, revenue: revenue[0]?.total || 0 });
});

// 👥 Manage Users
router.get("/users", protect, admin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

router.put("/users/:id", protect, admin, async (req, res) => {
  const { name, email, isAdmin } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = name || user.name;
  user.email = email || user.email;
  if (isAdmin !== undefined) user.isAdmin = isAdmin;

  const updatedUser = await user.save();
  res.json(updatedUser);
});

router.delete("/users/:id", protect, admin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

// 📦 Manage Products
router.get("/products", protect, admin, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.put("/products/:id", protect, admin, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  const { name, price, category, countInStock, image, description } = req.body;

  product.name = name;
  product.price = price;
  product.category = category;
  product.countInStock = countInStock;
  product.image = image;
  product.description = description;

  const updated = await product.save();
  res.json(updated);
});

router.delete("/products/:id", protect, admin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

// 🧾 Manage Orders
router.get("/orders", protect, admin, async (req, res) => {
  const orders = await Order.find().populate("user", "name email");
  res.json(orders);
});

router.put("/orders/:id/deliver", protect, admin, async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });
  order.isDelivered = true;
  order.deliveredAt = Date.now();
  const updatedOrder = await order.save();
  res.json(updatedOrder);
  res.json({ message: "Order marked as delivered" });
});

module.exports = router;
