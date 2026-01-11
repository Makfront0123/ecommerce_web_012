import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import { allCategories, createCategory, getCategory, editCategory, deleteCategory } from '../controllers/categoryController.js';
const router = express.Router();


//CREAR CATEGORIA
router.post('/', createCategory);

//MOSTRAR TODOS LAS CATEGORIAS
router.get('/', allCategories);

//MOSTRAR UNA CATEGORIA POR ID
router.get('/:id', getCategory);

//EDITAR UNA CATEGORIA
router.put('/:id',editCategory);

//ELIMINAR UNA CATEGORIA
router.delete('/:id', deleteCategory);
export default router;