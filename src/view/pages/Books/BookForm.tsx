import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { BookData } from '../../../model/BookData';

interface BookFormProps {
    book?: BookData;
    onSubmit: (data: Omit<BookData, 'id'>) => void;
    onCancel: () => void;
}

interface BookFormData {
    title: string;
    author: string;
    category: string;
    quantity: number;
    status: 'Available' | 'Checked Out' | 'Overdue';
}

export const BookForm = ({ book, onSubmit, onCancel }: BookFormProps) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<BookFormData>();

    useEffect(() => {
        if (book) {
            reset({
                title: book.title,
                author: book.author,
                category: book.category,
                quantity: book.quantity,
                status: book.status
            });
        }
    }, [book, reset]);

    const categories = [
        'Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 
        'Self-Help', 'Thriller', 'Memoir', 'Finance', 'Technology'
    ];

    const handleFormSubmit = (data: BookFormData) => {
        onSubmit(data);
    };

    console.log("Book Form Rendered")

    return (

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            {/* Title */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                </label>
                <input
                    type="text"
                    {...register('title', { required: 'Title is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    placeholder="Enter book title"
                />
                {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
            </div>

            {/* Author */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author *
                </label>
                <input
                    type="text"
                    {...register('author', { required: 'Author is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    placeholder="Enter author name"
                />
                {errors.author && (
                    <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
                )}
            </div>

            {/* Category */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                </label>
                <select
                    {...register('category', { required: 'Category is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                {errors.category && (
                    <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                )}
            </div>

            {/* Quantity */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity *
                </label>
                <input
                    type="number"
                    min="0"
                    {...register('quantity', { 
                        required: 'Quantity is required',
                        min: { value: 0, message: 'Quantity must be 0 or greater' }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    placeholder="Enter quantity"
                />
                {errors.quantity && (
                    <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>
                )}
            </div>

            {/* Status */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status *
                </label>
                <select
                    {...register('status', { required: 'Status is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                >
                    <option value="">Select status</option>
                    <option value="Available">Available</option>
                    <option value="Checked Out">Checked Out</option>
                    <option value="Overdue">Overdue</option>
                </select>
                {errors.status && (
                    <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
                )}
            </div>

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
                    {book ? 'Update Book' : 'Add Book'}
                </button>
            </div>
        </form>
    );
};