import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import { deleteOrder, editOrder, getOrder, allOrders, createOrder } from '../controllers/orderController.js';
import { checkAuth } from '../middleware/checkAuth.js';
const router = express.Router();

//CREAR ORDEN
router.post('/', checkAuth, createOrder);

//MOSTRAR TODOS LOS ORDENES
router.get('/', adminAuth, allOrders);

//MOSTRAR UN ORDEN POR ID
router.get('/:id', checkAuth, getOrder);

//EDITAR UN ORDEN
router.put('/:id', checkAuth, editOrder);

//ELIMINAR UN ORDEN
router.delete('/:id', checkAuth, deleteOrder);
export default router;