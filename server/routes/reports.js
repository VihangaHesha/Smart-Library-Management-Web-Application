const express = require('express');
const router = express.Router();
const { books } = require('../data/books');
const { members } = require('../data/members');
const { transactions } = require('../data/transactions');

// GET /api/reports/dashboard - Get dashboard statistics
router.get('/dashboard', (req, res) => {
  const totalBooks = books.length;
  const activeMembers = members.length;
  const booksCheckedOut = transactions.filter(t => t.status === 'Active').length;
  const overdueBooks = books.filter(b => b.status === 'Overdue').length;
  
  // Mock monthly growth data
  const monthlyGrowth = {
    books: 12,
    members: 8,
    checkouts: -3,
    overdue: 2
  };
  
  const dashboardStats = {
    totalBooks,
    activeMembers,
    booksCheckedOut,
    overdueBooks,
    monthlyGrowth
  };
  
  res.json(dashboardStats);
});

// GET /api/reports/categories - Get book category report
router.get('/categories', (req, res) => {
  const categoryCount = {};
  const totalBooks = books.length;
  
  // Count books by category
  books.forEach(book => {
    categoryCount[book.category] = (categoryCount[book.category] || 0) + 1;
  });
  
  // Convert to report format
  const categoryReport = Object.entries(categoryCount).map(([category, count]) => ({
    category,
    count,
    percentage: Math.round((count / totalBooks) * 100)
  }));
  
  // Sort by count descending
  categoryReport.sort((a, b) => b.count - a.count);
  
  res.json(categoryReport);
});

// GET /api/reports/member-activity - Get member activity report
router.get('/member-activity', (req, res) => {
  const memberActivity = members.map(member => {
    const memberTransactions = transactions.filter(t => t.memberId === member.id);
    const overdueTransactions = memberTransactions.filter(t => t.status === 'Overdue');
    const totalFines = overdueTransactions.reduce((sum, t) => sum + (t.fine || 0), 0);
    
    return {
      memberId: member.id,
      memberName: member.name,
      booksCheckedOut: member.booksCheckedOut,
      overdueBooks: overdueTransactions.length,
      totalFines
    };
  });
  
  res.json(memberActivity);
});

// GET /api/reports/overdue - Get detailed overdue report
router.get('/overdue', (req, res) => {
  const overdueTransactions = transactions.filter(t => t.status === 'Overdue');
  
  const overdueReport = overdueTransactions.map(transaction => {
    const book = books.find(b => b.id === transaction.bookId);
    const member = members.find(m => m.id === transaction.memberId);
    
    // Calculate days overdue
    const dueDate = new Date(transaction.dueDate);
    const today = new Date();
    const daysOverdue = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));
    
    return {
      ...transaction,
      daysOverdue,
      bookDetails: book,
      memberDetails: member
    };
  });
  
  res.json(overdueReport);
});

// GET /api/reports/monthly - Get monthly statistics
router.get('/monthly', (req, res) => {
  const { year, month } = req.query;
  
  // Mock monthly data - in real app, filter by date
  const monthlyStats = {
    year: year || new Date().getFullYear(),
    month: month || new Date().getMonth() + 1,
    newBooks: 15,
    newMembers: 8,
    totalCheckouts: 45,
    totalReturns: 42,
    overdueCount: 3,
    finesCollected: 25.50
  };
  
  res.json(monthlyStats);
});

module.exports = router;