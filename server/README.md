# BookNest Backend API

A simple Express.js backend for the BookNest Library Management System.

## Features

- **Books Management**: CRUD operations for books
- **Members Management**: CRUD operations for library members
- **Transactions**: Handle book borrowing and returning
- **Reports**: Generate various reports and statistics

## API Endpoints

### Books
- `GET /api/books` - Get all books (with optional filters)
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Add new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book
- `GET /api/books/status/overdue` - Get overdue books

### Members
- `GET /api/members` - Get all members
- `GET /api/members/:id` - Get member by ID
- `POST /api/members` - Add new member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

### Transactions
- `GET /api/transactions` - Get all transactions (with optional filters)
- `GET /api/transactions/:id` - Get transaction by ID
- `POST /api/transactions` - Add new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `POST /api/transactions/:id/return` - Mark transaction as returned

### Reports
- `GET /api/reports/dashboard` - Get dashboard statistics
- `GET /api/reports/categories` - Get book category report
- `GET /api/reports/member-activity` - Get member activity report
- `GET /api/reports/overdue` - Get overdue books report
- `GET /api/reports/monthly` - Get monthly statistics

## Running the Server

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. For development with auto-restart:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:5000`

## Data Storage

Currently uses in-memory storage for simplicity. In production, you would replace this with a proper database like MongoDB, PostgreSQL, or MySQL.

## CORS

CORS is enabled to allow requests from the frontend application.