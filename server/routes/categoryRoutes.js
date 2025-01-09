import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import { allCategories, createCategory, getCategory, editCategory, deleteCategory } from '../controllers/categoryController.js';
const router = express.Router();


//CREAR CATEGORIA
router.post('/create-category', createCategory);

//MOSTRAR TODOS LAS CATEGORIAS
router.get('/all-categories', allCategories);

//MOSTRAR UNA CATEGORIA POR ID
router.get('/category/:id', getCategory);

//EDITAR UNA CATEGORIA
router.put('/category/:id', adminAuth, editCategory);

//ELIMINAR UNA CATEGORIA
router.delete('/category/:id', adminAuth, deleteCategory);
export default router;