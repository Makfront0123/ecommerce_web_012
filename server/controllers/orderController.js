import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

export const createOrder = asyncHandler(async (req, res) => {
    const order = new Order(req.body);
    try {
        await order.save();
        return res.status(201).json(order);
    } catch (error) {
        return res.status(500).json(error);
    }
});

export const allOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find();
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json(error);
    }
});

export const getOrder = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({
                message: 'Order not found',
            });
        }
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json(error);
    }
});

export const editOrder = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (id !== req.oidc.user.sub && req.body.userType !== 'admin') {
            return res.status(401).json({
                message: 'Unauthorized: User not authorized',
            });
        }
        const order = await Order.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!order) {
            return res.status(404).json({
                message: 'Order not found',
            });
        }
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json(error);
    }
});

export const deleteOrder = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        if (id !== req.oidc.user.sub && req.body.userType !== 'admin') {
            return res.status(401).json({
                message: 'Unauthorized: User not authorized',
            });
        }
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            return res.status(404).json({
                message: 'Order not found',
            });
        }
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json(error);
    }
});