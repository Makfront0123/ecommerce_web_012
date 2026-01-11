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
        default: 0,
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
        validate: {
            validator: function (value) {
                return value >= 0 && value <= 100;
            },
            message: 'Discount must be between 0 and 100',
        },
    },
    dateAdded: {
        type: Date,
        default: Date.now,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    rating: {
        type: Number,
        default: 0
    },
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


productSchema.methods.getPriceAfterDiscount = function () {
    if (!this.flashSale || !this.discount) return this.price;
    return parseFloat((this.price * (1 - this.discount / 100)).toFixed(2));
};

export default mongoose.model('Product', productSchema);
