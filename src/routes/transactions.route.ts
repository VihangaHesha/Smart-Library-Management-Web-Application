import { Router } from 'express';
import {
  getAllTransactions,
  getTransactionById,
  borrowBook,
  returnBook,
  updateTransaction,
  deleteTransaction
} from '../controllers/transaction.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validateCreateTransaction, validateObjectId, validatePagination } from '../middleware/validation.middleware';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Routes accessible by all authenticated users
router.get('/', validatePagination, getAllTransactions);
router.get('/:id', validateObjectId, getTransactionById);

// Librarian/Admin routes for managing transactions
router.post('/borrow', authorize('admin', 'librarian'), validateCreateTransaction, borrowBook);
router.post('/:id/return', authorize('admin', 'librarian'), validateObjectId, returnBook);
router.put('/:id', authorize('admin', 'librarian'), validateObjectId, updateTransaction);
router.delete('/:id', authorize('admin', 'librarian'), validateObjectId, deleteTransaction);

export default router;