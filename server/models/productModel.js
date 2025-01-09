import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    flashSale: {
        type: Boolean,
        default: false,
    },
    discount: {
        type: Number,  
        default: 0,
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    rating: { type: Number, default: 0 },
    ratings: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        }
    }],
    ratingsCount: {
        type: Number,
        default: 0,  
    },
});

productSchema.methods.isInStock = function () {
    return this.quantity > 0;
};

productSchema.methods.calculateAverageRating = function () {
    if (this.ratingsCount === 0) return 0;
    return this.rating;
};

export default mongoose.model('Product', productSchema);