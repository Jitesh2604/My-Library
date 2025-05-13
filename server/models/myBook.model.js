import mongoose, { mongo } from 'mongoose';

const myBookSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    status: {
        type: String,
        enum: ['Went to Read', 'Currently Reading', "Readed"],
        default: 'Went to Read'
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
}, { timestamps: true });

export default mongoose.model('MyBook', myBookSchema);