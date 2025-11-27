const express = require('express');
const router = express.Router();
const { addOrder, getUserOrders, getAllOrders, markAsDelivered } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/', protect, addOrder);
router.get('/myorders', protect, getUserOrders);
router.get('/', protect, admin, getAllOrders);
router.put('/:id/deliver', protect, admin, markAsDelivered);


module.exports = router;
