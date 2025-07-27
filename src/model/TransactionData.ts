export interface TransactionData {
    id: string;
    bookId: number;
    bookTitle: string;
    bookAuthor: string;
    memberId: string;
    memberName: string;
    memberEmail: string;
    type: 'Borrow' | 'Return';
    borrowDate: string;
    dueDate: string;
    returnDate?: string;
    status: 'Active' | 'Completed' | 'Overdue';
    fine?: number;
}