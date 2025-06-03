import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    coverImage: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

export default mongoose.model('Book', bookSchema);