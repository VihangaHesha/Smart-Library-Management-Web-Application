import { Router } from 'express';
import {
  getDashboardStats,
  getBooksByCategory,
  getMemberActivity,
  getOverdueReport,
  getMonthlyTrends
} from '../controllers/report.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Routes accessible by all authenticated users
router.get('/dashboard', getDashboardStats);
router.get('/books-by-category', getBooksByCategory);

// Admin/Librarian only routes
router.get('/member-activity', authorize('admin', 'librarian'), getMemberActivity);
router.get('/overdue-books', authorize('admin', 'librarian'), getOverdueReport);
router.get('/monthly-trends', authorize('admin', 'librarian'), getMonthlyTrends);

export default router;