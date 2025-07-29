import mongoose, {Document, Schema, Types} from 'mongoose';

export interface IMember extends Document<Types.ObjectId> {
  memberId: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  membershipDate: Date;
  status: 'active' | 'inactive' | 'suspended';
  booksCheckedOut: number;
  maxBooksAllowed: number;
  totalFines: number;
  createdAt: Date;
  updatedAt: Date;
}

const memberSchema = new Schema<IMember>({
  memberId: {
    type: String,
    required: [true, 'Member ID is required'],
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  address: {
    type: String,
    trim: true,
    maxlength: [500, 'Address cannot exceed 500 characters']
  },
  membershipDate: {
    type: Date,
    required: [true, 'Membership date is required'],
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  booksCheckedOut: {
    type: Number,
    default: 0,
    min: [0, 'Books checked out cannot be negative']
  },
  maxBooksAllowed: {
    type: Number,
    default: 5,
    min: [1, 'Max books allowed must be at least 1']
  },
  totalFines: {
    type: Number,
    default: 0,
    min: [0, 'Total fines cannot be negative']
  }
}, {
  timestamps: true
});

// Generate member ID before saving
memberSchema.pre('save', async function(next) {
  if (!this.memberId) {
    const count = await mongoose.model('Member').countDocuments();
    this.memberId = `M-${String(count + 10001).padStart(5, '0')}`;
  }
  next();
});

// Indexes
memberSchema.index({ memberId: 1 });
memberSchema.index({ email: 1 });
memberSchema.index({ status: 1 });

export default mongoose.model<IMember>('Member', memberSchema);