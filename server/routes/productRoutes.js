import express from 'express';
import Product from '../models/productModel.js';
import { allProducts, createProduct, getProduct, editProduct, deleteProduct, searchProduct, getProductDiscount, rateProduct,getProductByCategory } from '../controllers/productController.js';
const router = express.Router();
import adminAuth from '../middleware/adminAuth.js';

//CREAR PRODUCTO
router.post('/create-product', createProduct);
//EDITAR UN PRODUCTO
router.put('/product/:id', adminAuth, editProduct);
//ELIMINAR UN PRODUCTO
router.delete('/product/:id', adminAuth, deleteProduct);
//MOSTRAR TODOS LOS PRODUCTOS
router.get('/all-products', allProducts);
//MOSTRAR UN PRODUCTO POR ID
router.get('/product/:id', getProduct);
//MOSTRAR TODOS LOS PRODUCTOS POR CATEGORIA
router.get('/product-category/:category', getProductByCategory);
//MOSTRAR PRODUCTOS POR DESCUENTO 
router.get('/product-discount', getProductDiscount);
//RATE PRODUCT
router.post('/rate-product/:productId', rateProduct);

//BUSCAR PRODUCTOS POR NOMBRE
router.get('/product-search', searchProduct);
export default router;