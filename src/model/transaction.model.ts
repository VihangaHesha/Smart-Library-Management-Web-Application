import mongoose, {Document, Schema, Types} from 'mongoose';

export interface ITransaction extends Document<Types.ObjectId> {
  transactionId: string;
  bookId: mongoose.Types.ObjectId;
  memberId: mongoose.Types.ObjectId;
  type: 'borrow' | 'return';
  borrowDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: 'active' | 'completed' | 'overdue';
  fine: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new Schema<ITransaction>({
  transactionId: {
    type: String,
    required: [true, 'Transaction ID is required'],
    unique: true,
    trim: true
  },
  bookId: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: [true, 'Book ID is required']
  },
  memberId: {
    type: Schema.Types.ObjectId,
    ref: 'Member',
    required: [true, 'Member ID is required']
  },
  type: {
    type: String,
    enum: ['borrow', 'return'],
    required: [true, 'Transaction type is required']
  },
  borrowDate: {
    type: Date,
    required: [true, 'Borrow date is required'],
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required']
  },
  returnDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'overdue'],
    default: 'active'
  },
  fine: {
    type: Number,
    default: 0,
    min: [0, 'Fine cannot be negative']
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  }
}, {
  timestamps: true
});

// Generate transaction ID before saving
transactionSchema.pre('save', async function(next) {
  if (!this.transactionId) {
    const count = await mongoose.model('Transaction').countDocuments();
    this.transactionId = `TXN-${String(count + 10001).padStart(5, '0')}`;
  }
  next();
});

// Indexes
transactionSchema.index({ transactionId: 1 });
transactionSchema.index({ bookId: 1 });
transactionSchema.index({ memberId: 1 });
transactionSchema.index({ status: 1 });
transactionSchema.index({ dueDate: 1 });

export default mongoose.model<ITransaction>('Transaction', transactionSchema);