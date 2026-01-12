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
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    const isProd = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "None" : "Lax",
        path: "/api",
    });


    res.json({ message: 'Logged in successfully', user });
};


export const logoutUser = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        path: "/api",
    });

    res.json({ message: "Logged out successfully" });
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
    const { name, email, password, confirmPassword, currentPassword } = req.body;

    try {
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (currentPassword) {
            const isMatch = await user.matchPassword(currentPassword);
            if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' });
        }
        if (password) {
            if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });
            user.password = password;
        }

        if (name) user.name = name;
        if (email) user.email = email;

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
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};




