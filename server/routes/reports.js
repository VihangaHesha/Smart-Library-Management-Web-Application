const express = require('express');
const { books } = require('../data/books');
const { members } = require('../data/members');
const { transactions } = require('../data/transactions');

const router = express.Router();

// Get dashboard statistics
router.get('/dashboard', (req, res) => {
  try {
    const totalBooks = books.length;
    const totalMembers = members.length;
    const activeMembers = members.filter(m => m.status === 'active').length;
    const totalTransactions = transactions.length;
    const activeBorrows = transactions.filter(t => t.status === 'borrowed').length;
    const overdueBooks = transactions.filter(t => t.status === 'overdue').length;
    const totalFines = transactions.reduce((sum, t) => sum + (t.fine || 0), 0);
    
    const stats = {
      totalBooks,
      totalMembers,
      activeMembers,
      totalTransactions,
      activeBorrows,
      overdueBooks,
      totalFines,
      availableBooks: books.reduce((sum, book) => sum + book.availableCopies, 0)
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
  }
});

// Get books by category distribution
router.get('/books-by-category', (req, res) => {
  try {
    const categoryCount = {};
    
    books.forEach(book => {
      const category = book.category || 'Uncategorized';
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });
    
    const categoryData = Object.entries(categoryCount).map(([category, count]) => ({
      category,
      count,
      percentage: ((count / books.length) * 100).toFixed(1)
    }));
    
    res.json(categoryData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category distribution' });
  }
});

// Get member activity report
router.get('/member-activity', (req, res) => {
  try {
    const memberActivity = members.map(member => {
      const memberTransactions = transactions.filter(t => t.memberId === member.id);
      const totalBorrows = memberTransactions.length;
      const activeBorrows = memberTransactions.filter(t => t.status === 'borrowed').length;
      const overdueBorrows = memberTransactions.filter(t => t.status === 'overdue').length;
      const totalFines = memberTransactions.reduce((sum, t) => sum + (t.fine || 0), 0);
      
      return {
        id: member.id,
        name: member.name,
        email: member.email,
        status: member.status,
        totalBorrows,
        activeBorrows,
        overdueBorrows,
        totalFines,
        membershipDate: member.membershipDate
      };
    });
    
    res.json(memberActivity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch member activity report' });
  }
});

// Get overdue books report
router.get('/overdue-books', (req, res) => {
  try {
    const overdueTransactions = transactions.filter(t => t.status === 'overdue');
    
    const overdueReport = overdueTransactions.map(transaction => {
      const book = books.find(b => b.id === transaction.bookId);
      const member = members.find(m => m.id === transaction.memberId);
      
      // Calculate days overdue
      const dueDate = new Date(transaction.dueDate);
      const today = new Date();
      const daysOverdue = Math.ceil((today - dueDate) / (1000 * 60 * 60 * 24));
      
      return {
        transactionId: transaction.id,
        bookTitle: book ? book.title : 'Unknown Book',
        bookAuthor: book ? book.author : 'Unknown Author',
        memberName: member ? member.name : 'Unknown Member',
        memberEmail: member ? member.email : 'Unknown Email',
        borrowDate: transaction.borrowDate,
        dueDate: transaction.dueDate,
        daysOverdue,
        fine: transaction.fine || (daysOverdue * 1.0)
      };
    });
    
    res.json(overdueReport);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch overdue books report' });
  }
});

// Get monthly transaction trends
router.get('/monthly-trends', (req, res) => {
  try {
    const monthlyData = {};
    
    transactions.forEach(transaction => {
      const date = new Date(transaction.borrowDate);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: monthKey,
          borrows: 0,
          returns: 0
        };
      }
      
      monthlyData[monthKey].borrows += 1;
      
      if (transaction.returnDate) {
        monthlyData[monthKey].returns += 1;
      }
    });
    
    const trendsData = Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));
    
    res.json(trendsData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch monthly trends' });
  }
});

module.exports = router;