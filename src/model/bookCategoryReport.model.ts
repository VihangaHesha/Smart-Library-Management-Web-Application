import mongoose from "mongoose";

const bookCategoryReportSchema = new mongoose.Schema({

    category: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    }
});

const BookCategoryReport = mongoose.model('BookCategoryReport', bookCategoryReportSchema);
export default BookCategoryReport;
