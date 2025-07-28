// In-memory data storage for members
let members = [
  {
    id: "M-10231",
    name: "Emily Brown",
    email: "emily.brown@example.com",
    membershipDate: "2024-03-15",
    booksCheckedOut: 2
  },
  {
    id: "M-10235",
    name: "David Lee",
    email: "david.lee@example.com",
    membershipDate: "2024-02-22",
    booksCheckedOut: 1
  },
  {
    id: "M-10236",
    name: "Priya Singh",
    email: "priya.singh@example.com",
    membershipDate: "2023-12-02",
    booksCheckedOut: 0
  }
];

let nextId = 10237;

module.exports = {
  members,
  getNextId: () => `M-${nextId++}`
};