import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import { registerUser, loginUser, logoutUser, getUserProfile, getAllUsers, deleteUser, editUser } from '../controllers/userController.js';
import { checkAuth } from '../middleware/checkAuth.js';
import{verifyToken} from '../middleware/verifyToken.js';

const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);


router.get('/check-auth', checkAuth, (req, res) => {

    res.json({
        isAuthenticated: true,
        user: req.user
    });

});



router.get('/profile/:id',  getUserProfile);
router.get('/all-users',adminAuth,verifyToken, getAllUsers);
router.delete('/user/:id', adminAuth,verifyToken, deleteUser);
router.put('/user/:id', checkAuth, verifyToken,editUser);


export default router;