import { Router } from 'express';
import {
  getAllMembers,
  getMemberById,
  getMemberByMemberId,
  createMember,
  updateMember,
  deleteMember
} from '../controllers/member.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validateCreateMember, validateObjectId, validatePagination } from '../middleware/validation.middleware';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Routes accessible by all authenticated users
router.get('/', validatePagination, getAllMembers);
router.get('/:id', validateObjectId, getMemberById);
router.get('/member-id/:memberId', getMemberByMemberId);

// Admin/Librarian only routes
router.post('/', authorize('admin', 'librarian'), validateCreateMember, createMember);
router.put('/:id', authorize('admin', 'librarian'), validateObjectId, updateMember);
router.delete('/:id', authorize('admin', 'librarian'), validateObjectId, deleteMember);

export default router;