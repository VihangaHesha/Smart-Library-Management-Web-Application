import { Router } from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getOverdueBooks,
  getBooksByCategory
} from '../controllers/book.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validateCreateBook, validateObjectId, validatePagination } from '../middleware/validation.middleware';

const router = Router();

// Public routes (for browsing)
router.get('/', getAllBooks);
router.get('/overdue', getOverdueBooks);
router.get('/category/:category', getBooksByCategory);
router.get('/:id', validateObjectId, getBookById);

// Protected routes (require authentication)
// router.use(authenticate);

// Admin/Librarian only routes
router.post('/',  createBook);
router.put('/:id',  updateBook);
router.delete('/:id',  deleteBook);

export default router;