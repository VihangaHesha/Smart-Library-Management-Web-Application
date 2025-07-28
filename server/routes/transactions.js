const express = require('express');
const router = express.Router();
const { transactions, getNextId } = require('../data/transactions');
const { books } = require('../data/books');
const { members } = require('../data/members');

// GET /api/transactions - Get all transactions
router.get('/', (req, res) => {
  const { status, type, memberId, bookId } = req.query;
  
  let filteredTransactions = transactions;
  
  if (status) {
    filteredTransactions = filteredTransactions.filter(t => t.status === status);
  }
  
  if (type) {
    filteredTransactions = filteredTransactions.filter(t => t.type === type);
  }
  
  if (memberId) {
    filteredTransactions = filteredTransactions.filter(t => t.memberId === memberId);
  }
  
  if (bookId) {
    filteredTransactions = filteredTransactions.filter(t => t.bookId === parseInt(bookId));
  }
  
  res.json(filteredTransactions);
});

// GET /api/transactions/:id - Get transaction by ID
router.get('/:id', (req, res) => {
  const transactionId = req.params.id;
  const transaction = transactions.find(t => t.id === transactionId);
  
  if (!transaction) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  
  res.json(transaction);
});

// POST /api/transactions - Add new transaction
router.post('/', (req, res) => {
  const { bookId, memberId, type, borrowDate, dueDate, returnDate, status, fine } = req.body;
  
  if (!bookId || !memberId || !type) {
    return res.status(400).json({ error: 'BookId, memberId, and type are required' });
  }
  
  // Find book and member details
  const book = books.find(b => b.id === parseInt(bookId));
  const member = members.find(m => m.id === memberId);
  
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  if (!member) {
    return res.status(404).json({ error: 'Member not found' });
  }
  
  const newTransaction = {
    id: getNextId(),
    bookId: parseInt(bookId),
    bookTitle: book.title,
    bookAuthor: book.author,
    memberId,
    memberName: member.name,
    memberEmail: member.email,
    type,
    borrowDate: borrowDate || new Date().toISOString().split('T')[0],
    dueDate: dueDate || (() => {
      const date = new Date();
      date.setDate(date.getDate() + 14);
      return date.toISOString().split('T')[0];
    })(),
    returnDate: returnDate || null,
    status: status || 'Active',
    fine: fine || 0
  };
  
  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});

// PUT /api/transactions/:id - Update transaction
router.put('/:id', (req, res) => {
  const transactionId = req.params.id;
  const transactionIndex = transactions.findIndex(t => t.id === transactionId);
  
  if (transactionIndex === -1) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  
  const { type, borrowDate, dueDate, returnDate, status, fine } = req.body;
  
  transactions[transactionIndex] = {
    ...transactions[transactionIndex],
    type: type || transactions[transactionIndex].type,
    borrowDate: borrowDate || transactions[transactionIndex].borrowDate,
    dueDate: dueDate || transactions[transactionIndex].dueDate,
    returnDate: returnDate !== undefined ? returnDate : transactions[transactionIndex].returnDate,
    status: status || transactions[transactionIndex].status,
    fine: fine !== undefined ? parseFloat(fine) : transactions[transactionIndex].fine
  };
  
  res.json(transactions[transactionIndex]);
});

// DELETE /api/transactions/:id - Delete transaction
router.delete('/:id', (req, res) => {
  const transactionId = req.params.id;
  const transactionIndex = transactions.findIndex(t => t.id === transactionId);
  
  if (transactionIndex === -1) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  
  transactions.splice(transactionIndex, 1);
  res.json({ message: 'Transaction deleted successfully' });
});

// POST /api/transactions/:id/return - Mark transaction as returned
router.post('/:id/return', (req, res) => {
  const transactionId = req.params.id;
  const transactionIndex = transactions.findIndex(t => t.id === transactionId);
  
  if (transactionIndex === -1) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  
  transactions[transactionIndex] = {
    ...transactions[transactionIndex],
    type: 'Return',
    status: 'Completed',
    returnDate: new Date().toISOString().split('T')[0]
  };
  
  res.json(transactions[transactionIndex]);
});

module.exports = router;