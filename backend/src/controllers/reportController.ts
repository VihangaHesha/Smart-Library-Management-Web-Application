import { Request, Response } from 'express';
import Book from '../model/Book';
import Member from '../model/Member';
import Transaction from '../model/Transaction';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [
      totalBooks,
      totalMembers,
      activeMembers,
      totalTransactions,
      activeBorrows,
      overdueBooks,
      totalFines
    ] = await Promise.all([
      Book.countDocuments({ isActive: true }),
      Member.countDocuments(),
      Member.countDocuments({ status: 'active' }),
      Transaction.countDocuments(),
      Transaction.countDocuments({ status: 'active' }),
      Transaction.countDocuments({ status: 'overdue' }),
      Transaction.aggregate([
        { $match: { fine: { $gt: 0 } } },
        { $group: { _id: null, total: { $sum: '$fine' } } }
      ])
    ]);

    // Calculate monthly growth (mock data for now)
    const monthlyGrowth = {
      books: 12,
      members: 8,
      checkouts: -3,
      overdue: 2
    };

    const stats = {
      totalBooks,
      totalMembers,
      activeMembers,
      totalTransactions,
      activeBorrows,
      overdueBooks,
      totalFines: totalFines[0]?.total || 0,
      availableBooks: await Book.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: null, total: { $sum: '$availableCopies' } } }
      ]).then(result => result[0]?.total || 0),
      monthlyGrowth
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch dashboard statistics'
    });
  }
};

export const getBooksByCategory = async (req: Request, res: Response) => {
  try {
    const categoryStats = await Book.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const totalBooks = await Book.countDocuments({ isActive: true });

    const categoryData = categoryStats.map(stat => ({
      category: stat._id || 'Uncategorized',
      count: stat.count,
      percentage: totalBooks > 0 ? ((stat.count / totalBooks) * 100).toFixed(1) : '0'
    }));

    res.json({
      success: true,
      data: categoryData
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch category distribution'
    });
  }
};

export const getMemberActivity = async (req: Request, res: Response) => {
  try {
    const memberActivity = await Member.aggregate([
      {
        $lookup: {
          from: 'transactions',
          localField: '_id',
          foreignField: 'memberId',
          as: 'transactions'
        }
      },
      {
        $project: {
          memberId: 1,
          name: 1,
          email: 1,
          status: 1,
          membershipDate: 1,
          totalBorrows: { $size: '$transactions' },
          activeBorrows: {
            $size: {
              $filter: {
                input: '$transactions',
                cond: { $eq: ['$$this.status', 'active'] }
              }
            }
          },
          overdueBorrows: {
            $size: {
              $filter: {
                input: '$transactions',
                cond: { $eq: ['$$this.status', 'overdue'] }
              }
            }
          },
          totalFines: {
            $sum: {
              $map: {
                input: '$transactions',
                as: 'transaction',
                in: '$$transaction.fine'
              }
            }
          }
        }
      },
      { $sort: { totalBorrows: -1 } }
    ]);

    res.json({
      success: true,
      data: memberActivity
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch member activity report'
    });
  }
};

export const getOverdueReport = async (req: Request, res: Response) => {
  try {
    const overdueTransactions = await Transaction.find({ status: 'overdue' })
      .populate('bookId', 'title author')
      .populate('memberId', 'name email memberId')
      .sort({ dueDate: 1 });

    const overdueReport = overdueTransactions.map(transaction => {
      const book = transaction.bookId as any;
      const member = transaction.memberId as any;
      
      // Calculate days overdue
      const dueDate = new Date(transaction.dueDate);
      const today = new Date();
      const daysOverdue = Math.ceil((today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));

      return {
        transactionId: transaction.transactionId,
        bookTitle: book?.title || 'Unknown Book',
        bookAuthor: book?.author || 'Unknown Author',
        memberName: member?.name || 'Unknown Member',
        memberEmail: member?.email || 'Unknown Email',
        memberId: member?.memberId || 'Unknown ID',
        borrowDate: transaction.borrowDate,
        dueDate: transaction.dueDate,
        daysOverdue,
        fine: transaction.fine || (daysOverdue * 1.0)
      };
    });

    res.json({
      success: true,
      data: overdueReport
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch overdue books report'
    });
  }
};

export const getMonthlyTrends = async (req: Request, res: Response) => {
  try {
    const monthlyData = await Transaction.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$borrowDate' },
            month: { $month: '$borrowDate' }
          },
          borrows: { $sum: 1 },
          returns: {
            $sum: {
              $cond: [{ $ne: ['$returnDate', null] }, 1, 0]
            }
          }
        }
      },
      {
        $project: {
          month: {
            $concat: [
              { $toString: '$_id.year' },
              '-',
              {
                $cond: [
                  { $lt: ['$_id.month', 10] },
                  { $concat: ['0', { $toString: '$_id.month' }] },
                  { $toString: '$_id.month' }
                ]
              }
            ]
          },
          borrows: 1,
          returns: 1
        }
      },
      { $sort: { month: 1 } }
    ]);

    res.json({
      success: true,
      data: monthlyData
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch monthly trends'
    });
  }
};