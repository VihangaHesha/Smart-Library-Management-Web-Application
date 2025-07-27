import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store/store';
import { getAllBooks, addBook, updateBook, deleteBook } from '../../../slices/booksSlice';
import { Book } from '../../common/Book/Book';
import { Modal } from '../../common/Modal/Modal';
import { BookForm } from './BookForm';
import { LoadingSpinner } from '../../common/LoadingSpinner/LoadingSpinner';
import type { BookData } from '../../../model/BookData';

export const Books = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { list: books, loading, error } = useSelector((state: RootState) => state.books);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<BookData | undefined>();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        dispatch(getAllBooks());
    }, [dispatch]);

    // Filter books based on search term and category
    const filteredBooks = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            book.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === '' || book.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Get unique categories for filter dropdown
    const categories = Array.from(new Set(books.map(book => book.category)));

    const handleAddBook = () => {
        setEditingBook(undefined);
        setIsModalOpen(true);
    };

    const handleEditBook = (book: BookData) => {
        setEditingBook(book);
        setIsModalOpen(true);
    };

    const handleDeleteBook = async (bookId: number) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                await dispatch(deleteBook(bookId)).unwrap();
                // TODO: Show success notification
                console.log('Book deleted successfully');
            } catch (error) {
                // TODO: Show error notification
                console.error('Failed to delete book:', error);
            }
        }
    };

    const handleFormSubmit = async (bookData: Omit<BookData, 'id'>) => {
        try {
            if (editingBook) {
                // Update existing book
                await dispatch(updateBook({ ...bookData, id: editingBook.id })).unwrap();
                console.log('Book updated successfully');
            } else {
                // Add new book
                await dispatch(addBook(bookData)).unwrap();
                console.log('Book added successfully');
            }
            setIsModalOpen(false);
            setEditingBook(undefined);
        } catch (error) {
            console.error('Failed to save book:', error);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingBook(undefined);
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-6">
                <LoadingSpinner size="lg" text="Loading books..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-6">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    Error: {error}
                </div>
            </div>
        );
    }

    return (
        <>
        <div className="container mx-auto px-4 py-6">
            {/*Page Header*/}
            <div
                className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6"
            >
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Books</h1>
                    <p className="text-gray-600">
                        Browse, manage, and organize your library's collection.
                    </p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                    <button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
                        onClick={handleAddBook}
                    >
                        <i className="fas fa-plus"></i>
                        <span>Add Book</span>
                    </button>
                    <button
                        className="bg-white hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-lg border border-gray-300 flex items-center space-x-2 transition"
                    >
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="bg-transparent border-none outline-none"
                        >
                            <option value="">All Categories</option>
                            {categories.map(category => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </button>
                    <button className="bg-white hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-lg border border-gray-300 flex items-center space-x-2 transition">
                        <i className="fas fa-filter"></i>
                        <span>Filter</span>
                    </button>
                </div>
            </div>
            {/*Book Table*/}
            <div className="bg-white rounded-lg shadow">
                <div
                    className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:justify-between md:items-center"
                >
                    <h2 className="text-lg font-semibold text-gray-800">All Books</h2>
                    <div className="mt-2 md:mt-0 flex space-x-2">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            placeholder="Search by title, author, ISBN..."
                        />
                        <button
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg transition"
                        >
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Title
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Author
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Category
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                ISBN
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Status
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {filteredBooks.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                    {searchTerm || selectedCategory ? 'No books match your search criteria' : 'No books found'}
                                </td>
                            </tr>
                        ) : (
                            filteredBooks.map((book) => (
                                <Book 
                                    key={book.id} 
                                    data={book} 
                                    onEdit={handleEditBook}
                                    onDelete={handleDeleteBook}
                                />
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
                <div
                    className="p-4 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between"
                >
                    <span className="text-sm text-gray-600">Showing {filteredBooks.length} of {books.length} books</span>
                    <div className="mt-2 md:mt-0">
                        <button
                            className="px-3 py-1 rounded-l-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                        >
                            Prev
                        </button>
                        <button
                            className="px-3 py-1 border-t border-b border-gray-300 text-white bg-indigo-600"
                        >
                            1
                        </button>
                        <button
                            className="px-3 py-1 border border-gray-300 text-gray-600 hover:bg-gray-100"
                        >
                            2
                        </button>
                        <button
                            className="px-3 py-1 border border-gray-300 text-gray-600 hover:bg-gray-100"
                        >
                            3
                        </button>
                        <button
                            className="px-3 py-1 rounded-r-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Add/Edit Book Modal */}
        <Modal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            title={editingBook ? 'Edit Book' : 'Add New Book'}
            size="md"
        >
            <BookForm book={editingBook} onSubmit={handleFormSubmit} onCancel={handleModalClose} />
        </Modal>
        </>
    );
};