export const Transactions = () => {
    return (
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
                        /*onClick="showNotification('New transaction added!')"*/
                    >
                        <i className="fas fa-plus"></i>
                        <span>Add Transaction</span>
                    </button>
                    <button
                        className="bg-white hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-lg border border-gray-300 flex items-center space-x-2 transition"
                    >
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
                        <tr>
                            <td
                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium"
                            >
                                TXN-10123
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div
                                        className="flex-shrink-0 h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center"
                                    >
                                        <i className="fas fa-book text-indigo-600"></i>
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-sm font-medium text-gray-900">
                                            The Silent Patient
                                        </div>
                                        <div className="text-xs text-gray-500">Alex Michaelides</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    Emily Brown
                                </div>
                                <div className="text-xs text-gray-500">
                                    emily.brown@example.com
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span
                      className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  >Borrow</span
                  >
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                2025-07-21
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span
                      className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
                  >Active</span
                  >
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                                    title="View"
                                >
                                    <i className="fas fa-eye"></i>
                                </button>
                                <button
                                    className="text-green-600 hover:text-green-900 mr-3"
                                    title="Mark as Returned"
                                >
                                    <i className="fas fa-undo-alt"></i>
                                </button>
                                <button
                                    className="text-red-600 hover:text-red-900"
                                    title="Delete"
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td
                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium"
                            >
                                TXN-10124
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div
                                        className="flex-shrink-0 h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center"
                                    >
                                        <i className="fas fa-book text-indigo-600"></i>
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-sm font-medium text-gray-900">
                                            Educated
                                        </div>
                                        <div className="text-xs text-gray-500">Tara Westover</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">David Lee</div>
                                <div className="text-xs text-gray-500">david.lee@example.com</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span
                      className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"
                  >Return</span
                  >
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                2025-07-20
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span
                      className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  >Completed</span
                  >
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                                    title="View"
                                >
                                    <i className="fas fa-eye"></i>
                                </button>
                                <button
                                    className="text-red-600 hover:text-red-900"
                                    title="Delete"
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td
                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium"
                            >
                                TXN-10125
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div
                                        className="flex-shrink-0 h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center"
                                    >
                                        <i className="fas fa-book text-indigo-600"></i>
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-sm font-medium text-gray-900">
                                            Atomic Habits
                                        </div>
                                        <div className="text-xs text-gray-500">James Clear</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    Priya Singh
                                </div>
                                <div className="text-xs text-gray-500">
                                    priya.singh@example.com
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span
                      className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  >Borrow</span
                  >
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                2025-07-19
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span
                      className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
                  >Active</span
                  >
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                                    title="View"
                                >
                                    <i className="fas fa-eye"></i>
                                </button>
                                <button
                                    className="text-green-600 hover:text-green-900 mr-3"
                                    title="Mark as Returned"
                                >
                                    <i className="fas fa-undo-alt"></i>
                                </button>
                                <button
                                    className="text-red-600 hover:text-red-900"
                                    title="Delete"
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                        {/*More rows if needed*/}
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
    );
};