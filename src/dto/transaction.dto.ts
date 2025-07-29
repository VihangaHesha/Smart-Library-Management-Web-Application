export interface CreateTransactionDTO {
  bookId: string;
  memberId: string;
  type: 'borrow' | 'return';
  dueDate?: Date;
  notes?: string;
}

export interface UpdateTransactionDTO {
  returnDate?: Date;
  status?: 'active' | 'completed' | 'overdue';
  fine?: number;
  notes?: string;
}

export interface TransactionResponseDTO {
  id: string;
  transactionId: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  memberId: string;
  memberName: string;
  memberEmail: string;
  type: 'borrow' | 'return';
  borrowDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: 'active' | 'completed' | 'overdue';
  fine: number;
  notes?: string;
}