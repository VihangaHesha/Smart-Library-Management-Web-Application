import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({

    id: {
        type: Number,
        unique: true,
        index: true,
        required: true
    },
    title: {
        type: String,
        required: true

    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Available', 'Checked Out', 'Overdue'], default: 'Available'
    }
});

const Book = mongoose.model('Book', bookSchema);
export default Book;