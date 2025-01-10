import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Name is required' });
        }
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        if (!password) {
            return res.status(400).json({ message: 'Password is required' });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ name, email, password });

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};

export const loginUser = async (req, res) => {
    const tokenVerify = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    if (tokenVerify) {
        return res.status(401).json({ message: 'Already logged in' });
    }
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error('JWT secret is not defined');
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production',sameSite: 'None', });

    res.json({ message: 'Logged in successfully' });
};

export const logoutUser = (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.json({ message: 'Logged out successfully' });
};

export const getUserProfile = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(_id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
};

export const getAllUsers = async (req, res) => {
    const users = await User.find();

    res.json(users);
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    await user.deleteOne();

    res.json({ message: 'User deleted successfully' });
};
export const editUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password, confirmPassword, currentPassword } = req.body;

    try {

        if (!name && !email && !currentPassword && !password) {
            return res.status(400).json({ message: 'At least one field must be updated' });
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }


        if (currentPassword) {
            const isMatch = await user.matchPassword(currentPassword);
            if (!isMatch) {
                return res.status(400).json({ message: 'Current password is incorrect' });
            }
        }


        if (password) {
            if (password !== confirmPassword) {
                return res.status(400).json({ message: 'New password and confirm password do not match' });
            }

            user.password = password;
        }

        if (name) {
            user.name = name;
        }

        if (email) {
            user.email = email;
        }


        await user.save();

        res.json({
            message: 'Profile updated successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture,
                userType: user.userType,
                dateJoined: user.dateJoined,
                isActive: user.isActive,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Error updating profile' });
    }
};



