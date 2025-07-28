import {  useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import type { TransactionData } from '../../../model/TransactionData';

interface TransactionFormProps {
    transaction?: TransactionData;
    onSubmit: (data: Omit<TransactionData, 'id'>) => void;
    onCancel: () => void;
}

interface TransactionFormData {
    bookId: number;
    memberId: string;
    type: 'Borrow' | 'Return';
    borrowDate: string;
    dueDate: string;
    returnDate?: string;
    status: 'Active' | 'Completed' | 'Overdue';
    fine?: number;
}

export const TransactionForm = ({ transaction, onSubmit, onCancel }: TransactionFormProps) => {
    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<TransactionFormData>();
    const { list: books } = useSelector((state: RootState) => state.books);
    const { list: members } = useSelector((state: RootState) => state.members);
    
    const watchType = watch('type');
    /*const watchBookId = watch('bookId');
    const watchMemberId = watch('memberId');*/

    useEffect(() => {
        if (transaction) {
            reset({
                bookId: transaction.bookId,
                memberId: transaction.memberId,
                type: transaction.type,
                borrowDate: transaction.borrowDate,
                dueDate: transaction.dueDate,
                returnDate: transaction.returnDate || '',
                status: transaction.status,
                fine: transaction.fine || 0
            });
        } else {
            // Set default values for new transaction
            const today = new Date().toISOString().split('T')[0];
            const twoWeeksLater = new Date();
            twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);
            
            reset({
                bookId: 0,
                memberId: '',
                type: 'Borrow',
                borrowDate: today,
                dueDate: twoWeeksLater.toISOString().split('T')[0],
                returnDate: '',
                status: 'Active',
                fine: 0
            });
        }
    }, [transaction, reset]);

    const handleFormSubmit = (data: TransactionFormData) => {
        // Get book and member details
        const selectedBook = books.find(book => book.id === Number(data.bookId));
        const selectedMember = members.find(member => member.id === data.memberId);

        if (!selectedBook || !selectedMember) {
            alert('Please select valid book and member');
            return;
        }

        const transactionData: Omit<TransactionData, 'id'> = {
            ...data,
            bookId: Number(data.bookId),
            bookTitle: selectedBook.title,
            bookAuthor: selectedBook.author,
            memberName: selectedMember.name,
            memberEmail: selectedMember.email,
            fine: data.fine || 0
        };

        onSubmit(transactionData);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            {/* Book Selection */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Book *
                </label>
                <select
                    {...register('bookId', { required: 'Book selection is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                >
                    <option value="">Select a book</option>
                    {books.map(book => (
                        <option key={book.id} value={book.id}>
                            {book.title} by {book.author}
                        </option>
                    ))}
                </select>
                {errors.bookId && (
                    <p className="text-red-500 text-sm mt-1">{errors.bookId.message}</p>
                )}
            </div>

            {/* Member Selection */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Member *
                </label>
                <select
                    {...register('memberId', { required: 'Member selection is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                >
                    <option value="">Select a member</option>
                    {members.map(member => (
                        <option key={member.id} value={member.id}>
                            {member.name} ({member.id})
                        </option>
                    ))}
                </select>
                {errors.memberId && (
                    <p className="text-red-500 text-sm mt-1">{errors.memberId.message}</p>
                )}
            </div>

            {/* Transaction Type */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Transaction Type *
                </label>
                <select
                    {...register('type', { required: 'Transaction type is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                >
                    <option value="Borrow">Borrow</option>
                    <option value="Return">Return</option>
                </select>
                {errors.type && (
                    <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
                )}
            </div>

            {/* Borrow Date */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Borrow Date *
                </label>
                <input
                    type="date"
                    {...register('borrowDate', { required: 'Borrow date is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
                {errors.borrowDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.borrowDate.message}</p>
                )}
            </div>

            {/* Due Date */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date *
                </label>
                <input
                    type="date"
                    {...register('dueDate', { required: 'Due date is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
                {errors.dueDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>
                )}
            </div>

            {/* Return Date (only for Return transactions) */}
            {watchType === 'Return' && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Return Date
                    </label>
                    <input
                        type="date"
                        {...register('returnDate')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                </div>
            )}

            {/* Status */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status *
                </label>
                <select
                    {...register('status', { required: 'Status is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                >
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Overdue">Overdue</option>
                </select>
                {errors.status && (
                    <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
                )}
            </div>

            {/* Fine (only for Overdue status) */}
            {watch('status') === 'Overdue' && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fine Amount ($)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        {...register('fine', { 
                            min: { value: 0, message: 'Fine cannot be negative' }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        placeholder="0.00"
                    />
                    {errors.fine && (
                        <p className="text-red-500 text-sm mt-1">{errors.fine.message}</p>
                    )}
                </div>
            )}

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                    {transaction ? 'Update Transaction' : 'Add Transaction'}
                </button>
            </div>
        </form>
    );
};