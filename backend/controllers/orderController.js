const Order = require('../models/Order');

// Create new order
exports.addOrder = async (req, res) => {
  const { orderItems, totalPrice } = req.body;
  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'No items in order' });
  }
  const order = new Order({
    user: req.user._id,
    orderItems,
    totalPrice,
  });
  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};

// Get orders for user
exports.getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

// Admin: get all orders
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find({}).populate('user', 'name email');
  res.json(orders);
};


// Mark order as delivered (admin only)
exports.markAsDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();
  res.json(updatedOrder);
};
