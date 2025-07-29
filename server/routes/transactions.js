const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { transactions } = require('../data/transactions');
const { books } = require('../data/books');
const { members } = require('../data/members');

const router = express.Router();

// Get all transactions with optional filtering
router.get('/', (req, res) => {
  try {
    let filteredTransactions = [...transactions];
    
    // Filter by status
    if (req.query.status) {
      filteredTransactions = filteredTransactions.filter(t => 
        t.status === req.query.status
      );
    }
    
    // Filter by member ID
    if (req.query.memberId) {
      filteredTransactions = filteredTransactions.filter(t => 
        t.memberId === req.query.memberId
      );
    }
    
    // Filter by book ID
    if (req.query.bookId) {
      filteredTransactions = filteredTransactions.filter(t => 
        t.bookId === req.query.bookId
      );
    }
    
    // Add book and member details to each transaction
    const enrichedTransactions = filteredTransactions.map(transaction => {
      const book = books.find(b => b.id === transaction.bookId);
      const member = members.find(m => m.id === transaction.memberId);
      
      return {
        ...transaction,
        bookTitle: book ? book.title : 'Unknown Book',
        bookAuthor: book ? book.author : 'Unknown Author',
        memberName: member ? member.name : 'Unknown Member'
      };
    });
    
    res.json(enrichedTransactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Get single transaction by ID
router.get('/:id', (req, res) => {
  try {
    const transaction = transactions.find(t => t.id === req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    
    const book = books.find(b => b.id === transaction.bookId);
    const member = members.find(m => m.id === transaction.memberId);
    
    res.json({
      ...transaction,
      book,
      member
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transaction' });
  }
});

// Create new borrow transaction
router.post('/borrow', (req, res) => {
  try {
    const { bookId, memberId } = req.body;
    
    if (!bookId || !memberId) {
      return res.status(400).json({ error: 'Book ID and Member ID are required' });
    }
    
    // Check if book exists and is available
    const book = books.find(b => b.id === bookId);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    if (book.availableCopies <= 0) {
      return res.status(400).json({ error: 'Book not available' });
    }
    
    // Check if member exists
    const member = members.find(m => m.id === memberId);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    // Calculate due date (14 days from now)
    const borrowDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);
    
    const newTransaction = {
      id: uuidv4(),
      bookId,
      memberId,
      type: 'borrow',
      borrowDate: borrowDate.toISOString().split('T')[0],
      dueDate: dueDate.toISOString().split('T')[0],
      returnDate: null,
      status: 'borrowed',
      fine: 0
    };
    
    transactions.push(newTransaction);
    
    // Update book availability
    book.availableCopies -= 1;
    
    // Update member borrowed books count
    member.borrowedBooks += 1;
    
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create borrow transaction' });
  }
});

// Return book
router.post('/return/:id', (req, res) => {
  try {
    const transactionIndex = transactions.findIndex(t => t.id === req.params.id);
    if (transactionIndex === -1) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    
    const transaction = transactions[transactionIndex];
    
    if (transaction.status !== 'borrowed' && transaction.status !== 'overdue') {
      return res.status(400).json({ error: 'Book is not currently borrowed' });
    }
    
    // Calculate fine if overdue
    const returnDate = new Date();
    const dueDate = new Date(transaction.dueDate);
    let fine = 0;
    
    if (returnDate > dueDate) {
      const daysOverdue = Math.ceil((returnDate - dueDate) / (1000 * 60 * 60 * 24));
      fine = daysOverdue * 1.0; // $1 per day fine
    }
    
    // Update transaction
    transaction.returnDate = returnDate.toISOString().split('T')[0];
    transaction.status = 'returned';
    transaction.fine = fine;
    
    // Update book availability
    const book = books.find(b => b.id === transaction.bookId);
    if (book) {
      book.availableCopies += 1;
    }
    
    // Update member borrowed books count
    const member = members.find(m => m.id === transaction.memberId);
    if (member) {
      member.borrowedBooks -= 1;
    }
    
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to return book' });
  }
});

// Update transaction status (for marking overdue books)
router.put('/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const transactionIndex = transactions.findIndex(t => t.id === req.params.id);
    
    if (transactionIndex === -1) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    
    transactions[transactionIndex].status = status;
    res.json(transactions[transactionIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update transaction status' });
  }
});

module.exports = router;