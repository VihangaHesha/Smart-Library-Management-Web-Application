import Transaction, { ITransaction } from '../model/transaction.model';
import Book from '../model/book.model';
import Member from '../model/member.model';
import { CreateTransactionDTO, UpdateTransactionDTO, TransactionResponseDTO } from '../dto/transaction.dto';
import { updateMemberStats } from "./member.service";

/**
 * Get all transactions, with pagination and optional filters.
 */
export const getAllTransactions = async (
    page: number = 1,
    limit: number = 10,
    status?: string,
    memberId?: string,
    bookId?: string
): Promise<{ transactions: TransactionResponseDTO[]; total: number; pages: number }> => {
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

  const transactionsDTO = transactions.map(mapToResponseDTO);

  return { transactions: transactionsDTO, total, pages };
};

/**
 * Get a single transaction by ID.
 */
export const getTransactionById = async (id: string): Promise<TransactionResponseDTO | null> => {
  const transaction = await Transaction.findById(id)
      .populate('bookId', 'title author')
      .populate('memberId', 'name email');
  if (!transaction) return null;
  return mapToResponseDTO(transaction);
};

/**
 * Create a borrow transaction.
 */
export const createBorrowTransaction = async (
    transactionData: CreateTransactionDTO
): Promise<TransactionResponseDTO> => {
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
  await updateMemberStats(transactionData.memberId);

  // Populate and return
  const populatedTransaction = await Transaction.findById(transaction._id)
      .populate('bookId', 'title author')
      .populate('memberId', 'name email');

  return mapToResponseDTO(populatedTransaction!);
};

/**
 * Return a book, completing a transaction and calculating any fine.
 */
export const returnBook = async (transactionId: string): Promise<TransactionResponseDTO> => {
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
  await updateMemberStats(transaction.memberId.toString());

  return mapToResponseDTO(transaction);
};

/**
 * Update an existing transaction.
 */
export const updateTransaction = async (
    id: string,
    updateData: UpdateTransactionDTO
): Promise<TransactionResponseDTO | null> => {
  const transaction = await Transaction.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
  )
      .populate('bookId', 'title author')
      .populate('memberId', 'name email');

  if (!transaction) return null;
  return mapToResponseDTO(transaction);
};

/**
 * Delete a transaction.
 * If it's active/overdue, restore book and update member stats.
 */
export const deleteTransaction = async (id: string): Promise<boolean> => {
  const transaction = await Transaction.findById(id);
  if (!transaction) return false;

  // If active or overdue, restore book availability and member stats
  if (transaction.status === 'active' || transaction.status === 'overdue') {
    await Book.findByIdAndUpdate(transaction.bookId, {
      $inc: { availableCopies: 1 }
    });
    await updateMemberStats(transaction.memberId.toString());
  }

  await Transaction.findByIdAndDelete(id);
  return true;
};

/**
 * Mark all overdue transactions as overdue.
 */
export const checkOverdueTransactions = async (): Promise<void> => {
  const overdueTransactions = await Transaction.find({
    status: 'active',
    dueDate: { $lt: new Date() }
  });

  for (const transaction of overdueTransactions) {
    transaction.status = 'overdue';
    await transaction.save();
  }
  console.log(`Updated ${overdueTransactions.length} overdue transactions`);
};

/**
 * Helper: map a transaction to a response DTO.
 */
export const mapToResponseDTO = (transaction: ITransaction): TransactionResponseDTO => {
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
};