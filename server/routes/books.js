const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { books } = require('../data/books');
const { transactions } = require('../data/transactions');

const router = express.Router();

// Get all books with optional filtering
router.get('/', (req, res) => {
  try {
    let filteredBooks = [...books];
    
    // Filter by category
    if (req.query.category) {
      filteredBooks = filteredBooks.filter(book => 
        book.category.toLowerCase().includes(req.query.category.toLowerCase())
      );
    }
    
    // Search by title or author
    if (req.query.search) {
      const searchTerm = req.query.search.toLowerCase();
      filteredBooks = filteredBooks.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
      );
    }
    
    res.json(filteredBooks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// Get single book by ID
router.get('/:id', (req, res) => {
  try {
    const book = books.find(b => b.id === req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch book' });
  }
});

// Add new book
router.post('/', (req, res) => {
  try {
    const { title, author, isbn, category, totalCopies, publishedYear } = req.body;
    
    // Basic validation
    if (!title || !author || !isbn) {
      return res.status(400).json({ error: 'Title, author, and ISBN are required' });
    }
    
    const newBook = {
      id: uuidv4(),
      title,
      author,
      isbn,
      category: category || 'General',
      totalCopies: totalCopies || 1,
      availableCopies: totalCopies || 1,
      publishedYear: publishedYear || new Date().getFullYear(),
      addedDate: new Date().toISOString().split('T')[0]
    };
    
    books.push(newBook);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add book' });
  }
});

// Update book
router.put('/:id', (req, res) => {
  try {
    const bookIndex = books.findIndex(b => b.id === req.params.id);
    if (bookIndex === -1) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    const updatedBook = { ...books[bookIndex], ...req.body };
    books[bookIndex] = updatedBook;
    
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update book' });
  }
});

// Delete book
router.delete('/:id', (req, res) => {
  try {
    const bookIndex = books.findIndex(b => b.id === req.params.id);
    if (bookIndex === -1) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    // Check if book is currently borrowed
    const activeBorrows = transactions.filter(t => 
      t.bookId === req.params.id && t.status === 'borrowed'
    );
    
    if (activeBorrows.length > 0) {
      return res.status(400).json({ error: 'Cannot delete book with active borrows' });
    }
    
    books.splice(bookIndex, 1);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

// Get overdue books
router.get('/overdue/list', (req, res) => {
  try {
    const overdueTransactions = transactions.filter(t => t.status === 'overdue');
    const overdueBooks = overdueTransactions.map(transaction => {
      const book = books.find(b => b.id === transaction.bookId);
      return {
        ...book,
        transactionId: transaction.id,
        memberId: transaction.memberId,
        dueDate: transaction.dueDate,
        fine: transaction.fine
      };
    });
    
    res.json(overdueBooks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch overdue books' });
  }
});

module.exports = router;