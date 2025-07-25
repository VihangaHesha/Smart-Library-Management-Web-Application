export const Reports = () => {
    return (
        <div className="container mx-auto px-4 py-6">
            {/*Page Header*/}
            <div
                className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6"
            >
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
                    <p className="text-gray-600">
                        Generate and review insights about your library.
                    </p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                    <button
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
                        // onClick="showNotification('Report generated!')"
                    >
                        <i className="fas fa-chart-bar"></i>
                        <span>Generate Report</span>
                    </button>
                    <button
                        className="bg-white hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-lg border border-gray-300 flex items-center space-x-2 transition"
                    >
                        <i className="fas fa-filter"></i>
                        <span>Filter</span>
                    </button>
                </div>
            </div>
            {/*Report Summery Cards*/}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500">Books Checked Out</p>
                            <h3 className="text-2xl font-bold">87</h3>
                        </div>
                        <div className="bg-yellow-100 p-3 rounded-full">
                            <i className="fas fa-exchange-alt text-yellow-600 text-xl"></i>
                        </div>
                    </div>
                    <p className="text-red-500 text-sm mt-2">
                        <i className="fas fa-arrow-down"></i> 3% from last month
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500">Overdue Books</p>
                            <h3 className="text-2xl font-bold">14</h3>
                        </div>
                        <div className="bg-red-100 p-3 rounded-full">
                            <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
                        </div>
                    </div>
                    <p className="text-red-500 text-sm mt-2">
                        <i className="fas fa-arrow-up"></i> 2% from last month
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500">Active Members</p>
                            <h3 className="text-2xl font-bold">342</h3>
                        </div>
                        <div className="bg-green-100 p-3 rounded-full">
                            <i className="fas fa-users text-green-600 text-xl"></i>
                        </div>
                    </div>
                    <p className="text-green-500 text-sm mt-2">
                        <i className="fas fa-arrow-up"></i> 8% from last month
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500">Total Books</p>
                            <h3 className="text-2xl font-bold">1,248</h3>
                        </div>
                        <div className="bg-indigo-100 p-3 rounded-full">
                            <i className="fas fa-book text-indigo-600 text-xl"></i>
                        </div>
                    </div>
                    <p className="text-green-500 text-sm mt-2">
                        <i className="fas fa-arrow-up"></i> 12% from last month
                    </p>
                </div>
            </div>

            {/*Report Table*/}
            <div className="bg-white rounded-lg shadow mb-6">
                <div
                    className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:justify-between md:items-center"
                >
                    <h2 className="text-lg font-semibold text-gray-800">
                        Borrowing & Overdue Details
                    </h2>
                    <div className="mt-2 md:mt-0 flex space-x-2">
                        <input
                            type="text"
                            className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            placeholder="Search by book/member..."
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
                                Borrow Date
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Due Date
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Status
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Fine
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
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    The Great Gatsby
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    John Smith
                                </div>
                                <div className="text-xs text-gray-500">john@example.com</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                2025-07-05
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                2025-07-15
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span
                      className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                  >Overdue</span
                  >
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                $3.50
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                                    title="Send Reminder"
                                >
                                    <i className="fas fa-envelope"></i>
                                </button>
                                <button
                                    className="text-green-600 hover:text-green-900"
                                    title="Mark as Returned"
                                >
                                    <i className="fas fa-check"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    Atomic Habits
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                2025-07-12
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                2025-07-22
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span
                      className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
                  >Active</span
                  >
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                $0.00
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button
                                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                                    title="Send Reminder"
                                >
                                    <i className="fas fa-envelope"></i>
                                </button>
                                <button
                                    className="text-green-600 hover:text-green-900"
                                    title="Mark as Returned"
                                >
                                    <i className="fas fa-check"></i>
                                </button>
                            </td>
                        </tr>
                        {/*More rows if needed*/}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};