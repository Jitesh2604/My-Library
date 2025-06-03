import express from 'express';
import { 
    getUserBooks,
    addBookToUser,
    updateReadingStatus,
    updateBookRating
} from "../controller/myBook.controller.js";
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

router.use(requireAuth);

router.get('/', getUserBooks);
router.post('/:bookId', addBookToUser);
router.patch('/:bookId/status', updateReadingStatus);
router.patch('/:bookId/rating', updateBookRating);

export default router;