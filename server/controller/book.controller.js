import Books from "../models/book.model.js";

export const getAllBooks = async (req, res) => {
    try {
        const books = await Books.find({});
        res.status(200).json({
            message: 'Fetch books successfully!',
            success: true,
            books: books
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed tofetch books!",
            success: false,
        });
    }
};