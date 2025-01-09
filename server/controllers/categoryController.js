import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';
import mongoose from 'mongoose';

export const createCategory = asyncHandler(async (req, res) => {
    const { name, description, icon } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }
    const category = new Category({ name, description, icon });
    try {
        await category.save();
        return res.status(201).json(category);
    } catch (error) {
        return res.status(500).json(error);
    }
});

export const allCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json(error);
    }
});

export const getCategory = asyncHandler(async (req, res) => {
    try {
        const { id: _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }
        const category = await Category.findById(_id);
        if (!category) {
            return res.status(404).json({
                message: 'Category not found',
            });
        }
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json(error);
    }
});

export const editCategory = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!category) {
            return res.status(404).json({
                message: 'Category not found',
            });
        }
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json(error);
    }
});

export const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({
                message: 'Category not found',
            });
        }
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json(error);
    }
}); 