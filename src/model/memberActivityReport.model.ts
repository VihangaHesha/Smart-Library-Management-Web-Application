import mongoose from "mongoose";

const memberActivityReportSchema = new mongoose.Schema({

    memberId: {
        type: String,
        required: true
    },
    memberName: {
        type: String,
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
    totalFines: {
        type: Number,
        required: true
    }
});

const MemberActivityReport = mongoose.model('MemberActivityReport', memberActivityReportSchema);
export default MemberActivityReport