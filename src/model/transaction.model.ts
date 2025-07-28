import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({

    id: {
        type: Number,
        unique: true,
        index: true,
        required: true
    },
    bookId: {
        type: Number,
        required: true
    },
    bookTitle: {
        type: String,
        required: true
    },
    bookAuthor: {
        type: String,
        required: true
    },
    memberId: {
        type: String,
        required: true
    },
    memberName: {
        type: String,
        required: true
    },
    memberEmail: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Borrow', 'Return'], default: 'Borrow'
    },
    borrowDate: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    },
    returnDate: {
        type: Date,
        required: false
    },
    status: {
        type: String,
        enum: ['Active', 'Completed', 'Overdue'], default: 'Active'
    },
    fine: {
        type: Number
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
