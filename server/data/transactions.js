// Sample transactions data
let transactions = [
  {
    id: '1',
    bookId: '1',
    memberId: '1',
    type: 'borrow',
    borrowDate: '2024-01-20',
    dueDate: '2024-02-03',
    returnDate: null,
    status: 'borrowed',
    fine: 0
  },
  {
    id: '2',
    bookId: '2',
    memberId: '2',
    type: 'borrow',
    borrowDate: '2024-01-18',
    dueDate: '2024-02-01',
    returnDate: null,
    status: 'overdue',
    fine: 5.00
  },
  {
    id: '3',
    bookId: '3',
    memberId: '1',
    type: 'borrow',
    borrowDate: '2024-01-15',
    dueDate: '2024-01-29',
    returnDate: '2024-01-28',
    status: 'returned',
    fine: 0
  }
];

module.exports = { transactions };