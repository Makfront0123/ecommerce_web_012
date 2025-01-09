import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    icon:{
        type: String,
        required: true,
    }
});

export default mongoose.model('Category', categorySchema);