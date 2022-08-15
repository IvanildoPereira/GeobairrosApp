const express = require('express')
const router = express.Router();
const productController = require('../controllers/productController');
const checkAuth = require('../middleware/check-auth');
const fileUpload = require('../middleware/file-Upload')

router.post('/create', checkAuth, fileUpload.any(), productController.createProduct);
router.post('/edit/:productId', checkAuth, fileUpload.any(), productController.editProduct);
router.post('/feed', checkAuth, productController.feed)
router.get('/:productId', checkAuth, productController.getProduct)
router.post('/map/nearest', checkAuth, productController.getProductsNearest)
router.get('/owner/products', checkAuth, productController.getOwnerProducts)
router.delete('/delete/:productId', checkAuth, productController.deleteProduct)

module.exports = router;