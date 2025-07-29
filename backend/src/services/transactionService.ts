import Transaction, { ITransaction } from '../model/Transaction';
import Book from '../model/Book';
import Member from '../model/Member';
import { CreateTransactionDTO, UpdateTransactionDTO, TransactionResponseDTO } from '../dto/TransactionDTO';
import { MemberService } from './memberService';

export class TransactionService {
  private memberService = new MemberService();

  async getAllTransactions(page: number = 1, limit: number = 10, status?: string, memberId?: string, bookId?: string): Promise<{ transactions: TransactionResponseDTO[], total: number, pages: number }> {
    try {
      const query: any = {};
      
      if (status) query.status = status;
      if (memberId) query.memberId = memberId;
      if (bookId) query.bookId = bookId;

      const skip = (page - 1) * limit;
      const transactions = await Transaction.find(query)
        .populate('bookId', 'title author')
        .populate('memberId', 'name email')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

      const total = await Transaction.countDocuments(query);
      const pages = Math.ceil(total / limit);

      const transactionsDTO = transactions.map(transaction => this.mapToResponseDTO(transaction));

      return { transactions: transactionsDTO, total, pages };
    } catch (error: any) {
      throw new Error(`Failed to fetch transactions: ${error.message}`);
    }
  }

  async getTransactionById(id: string): Promise<TransactionResponseDTO | null> {
    try {
      const transaction = await Transaction.findById(id)
        .populate('bookId', 'title author')
        .populate('memberId', 'name email');
      
      if (!transaction) return null;

      return this.mapToResponseDTO(transaction);
    } catch (error: any) {
      throw new Error(`Failed to fetch transaction: ${error.message}`);
    }
  }

  async createBorrowTransaction(transactionData: CreateTransactionDTO): Promise<TransactionResponseDTO> {
    try {
      // Validate book availability
      const book = await Book.findById(transactionData.bookId);
      if (!book || !book.isActive) {
        throw new Error('Book not found or inactive');
      }

      if (book.availableCopies <= 0) {
        throw new Error('Book not available for borrowing');
      }

      // Validate member
      const member = await Member.findById(transactionData.memberId);
      if (!member || member.status !== 'active') {
        throw new Error('Member not found or inactive');
      }

      if (member.booksCheckedOut >= member.maxBooksAllowed) {
        throw new Error('Member has reached maximum book limit');
      }

      // Calculate due date (14 days from now if not provided)
      const dueDate = transactionData.dueDate || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

      // Create transaction
      const transaction = new Transaction({
        bookId: transactionData.bookId,
        memberId: transactionData.memberId,
        type: 'borrow',
        borrowDate: new Date(),
        dueDate,
        status: 'active',
        notes: transactionData.notes
      });

      await transaction.save();

      // Update book availability
      await Book.findByIdAndUpdate(transactionData.bookId, {
        $inc: { availableCopies: -1 }
      });

      // Update member stats
      await this.memberService.updateMemberStats(transactionData.memberId);

      // Populate and return
      const populatedTransaction = await Transaction.findById(transaction._id)
        .populate('bookId', 'title author')
        .populate('memberId', 'name email');

      return this.mapToResponseDTO(populatedTransaction!);
    } catch (error: any) {
      throw new Error(`Failed to create borrow transaction: ${error.message}`);
    }
  }

  async returnBook(transactionId: string): Promise<TransactionResponseDTO> {
    try {
      const transaction = await Transaction.findById(transactionId)
        .populate('bookId', 'title author')
        .populate('memberId', 'name email');

      if (!transaction) {
        throw new Error('Transaction not found');
      }

      if (transaction.status !== 'active' && transaction.status !== 'overdue') {
        throw new Error('Book is not currently borrowed');
      }

      const returnDate = new Date();
      let fine = 0;

      // Calculate fine if overdue
      if (returnDate > transaction.dueDate) {
        const daysOverdue = Math.ceil((returnDate.getTime() - transaction.dueDate.getTime()) / (1000 * 60 * 60 * 24));
        fine = daysOverdue * 1.0; // $1 per day fine
      }

      // Update transaction
      transaction.returnDate = returnDate;
      transaction.status = 'completed';
      transaction.fine = fine;
      await transaction.save();

      // Update book availability
      await Book.findByIdAndUpdate(transaction.bookId, {
        $inc: { availableCopies: 1 }
      });

      // Update member stats
      await this.memberService.updateMemberStats(transaction.memberId.toString());

      return this.mapToResponseDTO(transaction);
    } catch (error: any) {
      throw new Error(`Failed to return book: ${error.message}`);
    }
  }

  async updateTransaction(id: string, updateData: UpdateTransactionDTO): Promise<TransactionResponseDTO | null> {
    try {
      const transaction = await Transaction.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      )
        .populate('bookId', 'title author')
        .populate('memberId', 'name email');
      
      if (!transaction) return null;

      return this.mapToResponseDTO(transaction);
    } catch (error: any) {
      throw new Error(`Failed to update transaction: ${error.message}`);
    }
  }

  async deleteTransaction(id: string): Promise<boolean> {
    try {
      const transaction = await Transaction.findById(id);
      if (!transaction) return false;

      // If it's an active transaction, restore book availability
      if (transaction.status === 'active' || transaction.status === 'overdue') {
        await Book.findByIdAndUpdate(transaction.bookId, {
          $inc: { availableCopies: 1 }
        });

        // Update member stats
        await this.memberService.updateMemberStats(transaction.memberId.toString());
      }

      await Transaction.findByIdAndDelete(id);
      return true;
    } catch (error: any) {
      throw new Error(`Failed to delete transaction: ${error.message}`);
    }
  }

  async checkOverdueTransactions(): Promise<void> {
    try {
      const overdueTransactions = await Transaction.find({
        status: 'active',
        dueDate: { $lt: new Date() }
      });

      for (const transaction of overdueTransactions) {
        transaction.status = 'overdue';
        await transaction.save();
      }

      console.log(`Updated ${overdueTransactions.length} overdue transactions`);
    } catch (error: any) {
      console.error('Failed to check overdue transactions:', error.message);
    }
  }

  private mapToResponseDTO(transaction: ITransaction): TransactionResponseDTO {
    const book = transaction.bookId as any;
    const member = transaction.memberId as any;

    return {
      id: transaction._id.toString(),
      transactionId: transaction.transactionId,
      bookId: book._id?.toString() || transaction.bookId.toString(),
      bookTitle: book.title || 'Unknown Book',
      bookAuthor: book.author || 'Unknown Author',
      memberId: member._id?.toString() || transaction.memberId.toString(),
      memberName: member.name || 'Unknown Member',
      memberEmail: member.email || 'Unknown Email',
      type: transaction.type,
      borrowDate: transaction.borrowDate,
      dueDate: transaction.dueDate,
      returnDate: transaction.returnDate,
      status: transaction.status,
      fine: transaction.fine,
      notes: transaction.notes
    };
  }
}