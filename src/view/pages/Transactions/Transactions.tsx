import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store/store';
import { getAllTransactions, addTransaction, updateTransaction, deleteTransaction } from '../../../slices/transactionsSlice';
import { getAllBooks } from '../../../slices/booksSlice';
import { getAllMembers } from '../../../slices/membersSlice';
import { Modal } from '../../common/Modal/Modal';
import { TransactionForm } from './TransactionForm';
import { LoadingSpinner } from '../../common/LoadingSpinner/LoadingSpinner';
import type { TransactionData } from '../../../model/TransactionData';

export const Transactions = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { list: transactions, loading, error } = useSelector((state: RootState) => state.transactions);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<TransactionData | undefined>();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        // Load all necessary data
        dispatch(getAllTransactions());
        dispatch(getAllBooks());
        dispatch(getAllMembers());
    }, [dispatch]);

    // Filter transactions based on search term and status
    const filteredTransactions = transactions.filter(transaction => {
        const matchesSearch = transaction.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            transaction.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === '' || transaction.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleAddTransaction = () => {
        setEditingTransaction(undefined);
        setIsModalOpen(true);
    };

    const handleEditTransaction = (transaction: TransactionData) => {
        setEditingTransaction(transaction);
        setIsModalOpen(true);
    };

    const handleDeleteTransaction = async (transactionId: string) => {
        if (window.confirm('Are you sure you want to delete this transaction?')) {
            try {
                await dispatch(deleteTransaction(transactionId)).unwrap();
                console.log('Transaction deleted successfully');
            } catch (error) {
                console.error('Failed to delete transaction:', error);
            }
        }
    };

    const handleMarkAsReturned = async (transaction: TransactionData) => {
        const updatedTransaction: TransactionData = {
            ...transaction,
            type: 'Return',
            status: 'Completed',
            returnDate: new Date().toISOString().split('T')[0]
        };

        try {
            await dispatch(updateTransaction(updatedTransaction)).unwrap();
            console.log('Transaction marked as returned');
        } catch (error) {
            console.error('Failed to update transaction:', error);
        }
    };

    const handleFormSubmit = async (transactionData: Omit<TransactionData, 'id'>) => {
        try {
            if (editingTransaction) {
                // Update existing transaction
                await dispatch(updateTransaction({ ...transactionData, id: editingTransaction.id })).unwrap();
                console.log('Transaction updated successfully');
            } else {
                // Add new transaction
                await dispatch(addTransaction(transactionData)).unwrap();
                console.log('Transaction added successfully');
            }
            setIsModalOpen(false);
            setEditingTransaction(undefined);
        } catch (error) {
            console.error('Failed to save transaction:', error);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingTransaction(undefined);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active':
                return 'bg-blue-100 text-blue-800';
            case 'Completed':
                return 'bg-green-100 text-green-800';
            case 'Overdue':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Borrow':
                return 'bg-green-100 text-green-800';
            case 'Return':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-6">
                <LoadingSpinner size="lg" text="Loading transactions..." />
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
                    <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
                    <p className="text-gray-600">
                        Manage all borrow and return transactions.
                    </p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                    <button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
                        onClick={handleAddTransaction}
                    >
                        <i className="fas fa-plus"></i>
                        <span>Add Transaction</span>
                    </button>
                    <button
                        className="bg-white hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-lg border border-gray-300 flex items-center space-x-2 transition"
                    >
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-transparent border-none outline-none"
                        >
                            <option value="">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Completed">Completed</option>
                            <option value="Overdue">Overdue</option>
                        </select>
                    </button>
                    <button className="bg-white hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-lg border border-gray-300 flex items-center space-x-2 transition">
                        <i className="fas fa-filter"></i>
                        <span>Filter</span>
                    </button>
                </div>
            </div>
            {/*Transaction Table*/}
            <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Recent Transactions
                    </h2>
                    <div className="mt-2 flex space-x-2">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            placeholder="Search by book, member, or transaction ID..."
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Transaction ID
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Book
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Member
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Type
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Date
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
                        {filteredTransactions.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                                    {searchTerm || statusFilter ? 'No transactions match your search criteria' : 'No transactions found'}
                                </td>
                            </tr>
                        ) : (
                            filteredTransactions.map((transaction) => (
                                <tr key={transaction.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                        {transaction.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                                <i className="fas fa-book text-indigo-600"></i>
                                            </div>
                                            <div className="ml-3">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {transaction.bookTitle}
                                                </div>
                                                <div className="text-xs text-gray-500">{transaction.bookAuthor}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {transaction.memberName}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {transaction.memberEmail}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeColor(transaction.type)}`}>
                                            {transaction.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {transaction.borrowDate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                                            {transaction.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                                            title="Edit"
                                            onClick={() => handleEditTransaction(transaction)}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        {transaction.status === 'Active' && (
                                            <button
                                                className="text-green-600 hover:text-green-900 mr-3"
                                                title="Mark as Returned"
                                                onClick={() => handleMarkAsReturned(transaction)}
                                            >
                                                <i className="fas fa-undo-alt"></i>
                                            </button>
                                        )}
                                        <button
                                            className="text-red-600 hover:text-red-900"
                                            title="Delete"
                                            onClick={() => handleDeleteTransaction(transaction.id)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
                {/*Optional function*/}
                <div className="p-4 border-t border-gray-200 text-center">
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                        View All Transactions
                    </button>
                </div>
            </div>
        </div>

        {/* Add/Edit Transaction Modal */}
        <Modal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            title={editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
            size="lg"
        >
            <TransactionForm transaction={editingTransaction} onSubmit={handleFormSubmit} onCancel={handleModalClose} />
        </Modal>
        </>
    );
};