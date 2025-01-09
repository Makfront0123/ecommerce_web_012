import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import Category from '../models/categoryModel.js';

export const createProduct = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, image, quantity, category, isActive, flashSale, discount } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }
        if (!description) {
            return res.status(400).json({ message: "Description is required" });
        }
        if (!price) {
            return res.status(400).json({ message: "Price is required" });
        }
        if (!image) {
            return res.status(400).json({ message: "Image is required" });
        }
        if (!category) {
            return res.status(400).json({ message: "Category is required" });
        }
        if (!isActive) {
            return res.status(400).json({ message: "IsActive is required" });
        }
        if (!quantity) {
            return res.status(400).json({ message: "Quantity is required" });
        }


        const product = new Product({
            name,
            description,
            price,
            image,
            quantity,
            category,
            isActive,
            flashSale: flashSale !== undefined ? flashSale : undefined,
            discount: discount !== undefined ? discount : undefined,
        });
        await product.save();
        return res.status(201).json(product);
    } catch (error) {
        return res.status(500).json(error);
    }
});

export const allProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json(error);
    }
});

export const getProductDiscount = asyncHandler(async (req, res) => {
    try {
        const discountProduct = await Product.find({
            flashSale: true,
        });

        if (!discountProduct || discountProduct.length === 0) {
            return res.status(404).json({
                message: 'No products found for flash sale',
            });
        }
        return res.status(200).json(discountProduct);
    } catch (error) {
        return res.status(500).json(error);
    }
});

export const getProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                message: 'Product not found',
            });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json(error);
    }
});

export const editProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!product) {
            return res.status(404).json({
                message: 'Product not found',
            });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json(error);
    }
});

export const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({
                message: 'Product not found',
            });
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json(error);
    }
});

export const searchProduct = asyncHandler(async (req, res) => {
    try {
        const { name, category } = req.query;
        const query = {};

        console.log(name, category)

        
        if (name) query.name = { $regex: name, $options: 'i' };


        if (category) {

            const categoryDoc = await Category.findOne({ name: category });

            if (!categoryDoc) {
                return res.status(404).json({ message: "Category not found" });
            }


            query.category = categoryDoc._id;
        }

        const products = await Product.find(query);


        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json(error);
    }
});


export const getProductByCategory = asyncHandler(async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ category: category });
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json(error);
    }
});


export const rateProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params
    const { rating } = req.body

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.ratings.push({ user: req.user._id, rating });

        product.ratingsCount = product.ratings.length
        product.rating = product.ratings.reduce((acc, val) => acc + val.rating, 0) / product.ratingsCount
        await product.save();
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json(error);
    }
});
