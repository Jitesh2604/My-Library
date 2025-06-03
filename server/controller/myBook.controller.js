import MyBook from "../models/myBook.model.js";
import Book from "../models/book.model.js";

// GET /api/mybooks - Get books added by user
export const getUserBooks = async (req, res) => {
    try {
        const myBooks = await MyBook.find({ userId: req.user.id }).populate("bookId");
        res.status(200).json({
            message: 'Fetch books successfully!',
            success: true,
            Books: myBooks
        });
    } catch (err) {
        res.status(500).json({
            message: 'Failed to fetch user books',
            success: false
        });        
    }
};

// POST /api/mybooks/:bookId - Add book to user's list
export const addBookToUser = async (req, res) => {
    const { bookId } = req.params;
    
    try {
        // Check if already added
        const exists = await MyBook.findOne({ userId: req.user.id, bookId });
        if(exists) {
            return res.status(400).json({
                message: 'Book already in your list',
                success: false
            });
        };
        const myBook = new MyBook({
            userId:  req.user.id,
            bookId,
            status: 'Went to Read'
        });
        await myBook.save();
        res.status(200).json({
            message: 'Book added to your list',
            success: true
        });    
    } catch (err) {
        res.status(500).json({ 
            message: 'Failed to add book',
            success: false
        });
    }
};

// PATCH /api/mybooks/:bookId/status - Update reading status
export const updateReadingStatus = async (req, res) => {
    const { bookId } = req.params;
    const { status } = req.params;

    try {
        const validStatuses = ['Went to Read', 'Currently Reading', 'Readed'];
        if(!validStatuses.includes(this.status)) {
            return res.status(400).json({
                message: 'Invalid status',
                status: true
            });
        };

        const updated = await MyBook.findByIdAndUpdate(
            { userId: req.user.id, bookId },
            { status },
            { new: true }
        );
        if(!updated){
            res.status(404).json({
                message: 'Book not found in your list',
                status: false
            });
        };
        res.status(200).json({
            message: 'Status updated',
            success: true, 
            data: updated
        });
    } catch (err) {
        res.status(500).json({ 
            message: 'Failed to update status', 
            status: false 
        });
    }
};

export const updateBookRating = async (req, res) => {
    const { bookId } = req.params;
    const { rating } = req.params;

    try {
        if(rating < 1 || rating > 5){
            return res.status(400).json({
                message: "Rating must be between 1 to 5",
                success: false
            });
        };

        const updated = await MyBook.findOneAndUpdate(
            { userId: req.user.id, bookId },
            { rating },
            { new: true }
        );
        if(!updated){
            res.status(404).json({
                message: 'Book not found in your list',
                status: false
            });
        };
        res.status(200).json({
            message: 'Rating updated',
            success: true, 
            data: updated
        });
    } catch (err) {
        res.status(500).json({ 
            message: 'Failed to update rating', 
            status: false 
        });  
    }
};
