const express = require('express');
const router = express.Router();
const { books, getNextId } = require('../data/books');

// GET /api/books - Get all books
router.get('/', (req, res) => {
  const { category, status } = req.query;
  
  let filteredBooks = books;
  
  if (category) {
    filteredBooks = filteredBooks.filter(book => book.category === category);
  }
  
  if (status) {
    filteredBooks = filteredBooks.filter(book => book.status === status);
  }
  
  res.json(filteredBooks);
});

// GET /api/books/:id - Get book by ID
router.get('/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);
  
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  res.json(book);
});

// POST /api/books - Add new book
router.post('/', (req, res) => {
  const { title, author, category, quantity, status } = req.body;
  
  if (!title || !author || !category || quantity === undefined) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const newBook = {
    id: getNextId(),
    title,
    author,
    category,
    quantity: parseInt(quantity),
    status: status || 'Available'
  };
  
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /api/books/:id - Update book
router.put('/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === bookId);
  
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  const { title, author, category, quantity, status } = req.body;
  
  books[bookIndex] = {
    ...books[bookIndex],
    title: title || books[bookIndex].title,
    author: author || books[bookIndex].author,
    category: category || books[bookIndex].category,
    quantity: quantity !== undefined ? parseInt(quantity) : books[bookIndex].quantity,
    status: status || books[bookIndex].status
  };
  
  res.json(books[bookIndex]);
});

// DELETE /api/books/:id - Delete book
router.delete('/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === bookId);
  
  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  books.splice(bookIndex, 1);
  res.json({ message: 'Book deleted successfully' });
});

// GET /api/books/overdue - Get overdue books
router.get('/status/overdue', (req, res) => {
  const overdueBooks = books.filter(book => book.status === 'Overdue');
  res.json(overdueBooks);
});

module.exports = router;