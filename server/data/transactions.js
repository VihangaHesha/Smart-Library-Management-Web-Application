// In-memory data storage for transactions
let transactions = [
  {
    id: "TXN-10123",
    bookId: 2,
    bookTitle: "The Silent Patient",
    bookAuthor: "Alex Michaelides",
    memberId: "M-10234",
    memberName: "Emily Brown",
    memberEmail: "emily.brown@example.com",
    type: "Borrow",
    borrowDate: "2025-01-15",
    dueDate: "2025-01-29",
    status: "Active"
  },
  {
    id: "TXN-10124",
    bookId: 3,
    bookTitle: "Educated",
    bookAuthor: "Tara Westover",
    memberId: "M-10235",
    memberName: "David Lee",
    memberEmail: "david.lee@example.com",
    type: "Return",
    borrowDate: "2025-01-10",
    dueDate: "2025-01-24",
    returnDate: "2025-01-20",
    status: "Completed"
  },
  {
    id: "TXN-10125",
    bookId: 1,
    bookTitle: "Atomic Habits",
    bookAuthor: "James Clear",
    memberId: "M-10236",
    memberName: "Priya Singh",
    memberEmail: "priya.singh@example.com",
    type: "Borrow",
    borrowDate: "2025-01-05",
    dueDate: "2025-01-19",
    status: "Overdue",
    fine: 3.50
  }
];

let nextId = 10126;

module.exports = {
  transactions,
  getNextId: () => `TXN-${nextId++}`
};