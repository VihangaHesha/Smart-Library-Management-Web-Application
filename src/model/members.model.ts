import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({

    id: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    membershipDate: {
        type: String,
        required: true
    },
    booksCheckedOut: {
        type: Number,
        required: true
    }
});

const Member = mongoose.model('Member', memberSchema);
export default Member