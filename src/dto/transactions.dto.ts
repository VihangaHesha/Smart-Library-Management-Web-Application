export interface TransactionsDto{
    id: number;
    bookId: number;
    bookTitle: string;
    bookAuthor: string;
    memberId: string;
    memberName: string;
    memberEmail: string;
    type: 'Borrow' | 'Return';
    borrowDate: string;
    dueDate: string;
    returnDate?: Date;
    status: 'Active' | 'Completed' | 'Overdue';
    fine?: number;
}