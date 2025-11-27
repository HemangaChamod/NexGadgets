/*

This file defines API routes (URLs) that clients — such as your frontend app — can call to:

Get all products

Get one product by ID

Create a new product

Update an existing product

Delete a product

Each route here tells Express which controller function should handle that request, and whether authentication or admin privileges are required.

*/

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware'); //By writing { protect, admin } you are pulling out these two specific functions from the exported object, instead of importing everything.


router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', protect, admin, productController.createProduct);
router.put('/:id', protect, admin, productController.updateProduct);
router.delete('/:id', protect, admin, productController.deleteProduct);


module.exports = router;