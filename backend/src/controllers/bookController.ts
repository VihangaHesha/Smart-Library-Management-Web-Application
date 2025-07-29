import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { BookService } from '../services/bookService';

const bookService = new BookService();

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;
    const category = req.query.category as string;

    const result = await bookService.getAllBooks(page, limit, search, category);
    
    res.json({
      success: true,
      data: result.books,
      pagination: {
        page,
        limit,
        total: result.total,
        pages: result.pages
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch books'
    });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid book ID',
        errors: errors.array()
      });
    }

    const book = await bookService.getBookById(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.json({
      success: true,
      data: book
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch book'
    });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const book = await bookService.createBook(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create book'
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const book = await bookService.updateBook(req.params.id, req.body);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.json({
      success: true,
      message: 'Book updated successfully',
      data: book
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update book'
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid book ID',
        errors: errors.array()
      });
    }

    const deleted = await bookService.deleteBook(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.json({
      success: true,
      message: 'Book deleted successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete book'
    });
  }
};

export const getOverdueBooks = async (req: Request, res: Response) => {
  try {
    const books = await bookService.getOverdueBooks();
    
    res.json({
      success: true,
      data: books
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch overdue books'
    });
  }
};

export const getBooksByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const books = await bookService.getBooksByCategory(category);
    
    res.json({
      success: true,
      data: books
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch books by category'
    });
  }
};