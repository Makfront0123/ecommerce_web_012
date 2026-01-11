import express from 'express';
import { allProducts, createProduct, getProduct, editProduct, deleteProduct, searchProduct, getProductDiscount, rateProduct,getProductByCategory } from '../controllers/productController.js';
const router = express.Router();

router.post('/', createProduct);
router.put('/:id', editProduct);
router.delete('/:id', deleteProduct);

router.get('/', allProducts);
router.get('/product-discount', getProductDiscount);
router.get('/product-search', searchProduct);
router.get('/category/:categoryId', getProductByCategory);
router.get('/:id', getProduct);

router.post('/rate-product/:productId', rateProduct);

export default router;