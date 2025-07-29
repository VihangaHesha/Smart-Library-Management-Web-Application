import { Router } from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getOverdueBooks,
  getBooksByCategory
} from '../controllers/bookController';
import { authenticate, authorize } from '../middleware/auth';
import { validateCreateBook, validateObjectId, validatePagination } from '../middleware/validation';

const router = Router();

// Public routes (for browsing)
router.get('/', validatePagination, getAllBooks);
router.get('/overdue', getOverdueBooks);
router.get('/category/:category', getBooksByCategory);
router.get('/:id', validateObjectId, getBookById);

// Protected routes (require authentication)
router.use(authenticate);

// Admin/Librarian only routes
router.post('/', authorize('admin', 'librarian'), validateCreateBook, createBook);
router.put('/:id', authorize('admin', 'librarian'), validateObjectId, updateBook);
router.delete('/:id', authorize('admin', 'librarian'), validateObjectId, deleteBook);

export default router;