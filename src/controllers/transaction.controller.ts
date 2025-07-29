import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as transactionService from '../services/transaction.service';


export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    const memberId = req.query.memberId as string;
    const bookId = req.query.bookId as string;

    const result = await transactionService.getAllTransactions(page, limit, status, memberId, bookId);
    
    res.json({
      success: true,
      data: result.transactions,
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
      message: error.message || 'Failed to fetch transactions'
    });
  }
};

export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid transaction ID',
        errors: errors.array()
      });
    }

    const transaction = await transactionService.getTransactionById(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    res.json({
      success: true,
      data: transaction
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch transaction'
    });
  }
};

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const transaction = await transactionService.createBorrowTransaction(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: transaction
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to borrow book'
    });
  }
};

export const returnBook = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid transaction ID',
        errors: errors.array()
      });
    }

    const transaction = await transactionService.returnBook(req.params.id);
    
    res.json({
      success: true,
      message: 'Book returned successfully',
      data: transaction
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to return book'
    });
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const transaction = await transactionService.updateTransaction(req.params.id, req.body);
    
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    res.json({
      success: true,
      message: 'Transaction updated successfully',
      data: transaction
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update transaction'
    });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid transaction ID',
        errors: errors.array()
      });
    }

    const deleted = await transactionService.deleteTransaction(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    res.json({
      success: true,
      message: 'Transaction deleted successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete transaction'
    });
  }
};