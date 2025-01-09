import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import { deleteOrder, editOrder, getOrder, allOrders, createOrder } from '../controllers/orderController.js';
import { checkAuth } from '../middleware/checkAuth.js';
const router = express.Router();

//CREAR ORDEN
router.post('/create-order', checkAuth, createOrder);

//MOSTRAR TODOS LOS ORDENES
router.get('/all-orders', adminAuth, allOrders);

//MOSTRAR UN ORDEN POR ID
router.get('/order/:id', checkAuth, getOrder);

//EDITAR UN ORDEN
router.put('/order/:id', checkAuth, editOrder);

//ELIMINAR UN ORDEN
router.delete('/order/:id', checkAuth, deleteOrder);
export default router;