import mongoose from "mongoose";

const reportsSchema = new mongoose.Schema({

    totalBooks: {
        type: Number,
        required: true
    },
    activeMembers: {
        type: Number,
        required: true
    },
    booksCheckedOut: {
        type: Number,
        required: true
    },
    overdueBooks: {
        type: Number,
        required: true
    },
    monthlyGrowth: {
        books: {
            type: Number,
            required: true
        },
        members: {
            type: Number,
            required: true
        },
        checkouts: {
            type: Number,
            required: true
        },
        overdue: {
            type: Number,
            required: true
        }
    }
});

const Reports = mongoose.model('Reports', reportsSchema);
export default Reports;

