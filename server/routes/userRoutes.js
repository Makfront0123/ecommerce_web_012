import express from 'express';
import { checkAuth } from '../middleware/checkAuth.js';
import  adminAuth  from '../middleware/adminAuth.js';
import { getAllUsers, deleteUser, editUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/', checkAuth, adminAuth, getAllUsers);
router.delete('/', checkAuth, adminAuth, deleteUser);
router.put('/', checkAuth, editUser);

export default router;