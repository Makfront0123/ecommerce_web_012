import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const adminAuth = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        const user = await User.findById(req.user.userId);
        if (!user || user.userType !== 'admin') {
            return res.status(403).json({ message: 'Access denied, you do not have admin privileges' });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

export default adminAuth;
