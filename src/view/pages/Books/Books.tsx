export const Books = () => {
    return (
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
                        // onClick="showNotification('Book successfully added!')"
                    >
                        <i className="fas fa-plus"></i>
                        <span>Add Book</span>
                    </button>
                    <button
                        className="bg-white hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-lg border border-gray-300 flex items-center space-x-2 transition"
                    >
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
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div
                                        className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center"
                                    >
                                        <i className="fas fa-book text-indigo-600"></i>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            The Silent Patient
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Alex Michaelides
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Thriller
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                9781250301697
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span
                      className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  >Available</span
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
                                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                                    title="Edit"
                                >
                                    <i className="fas fa-edit"></i>
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
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div
                                        className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center"
                                    >
                                        <i className="fas fa-book text-indigo-600"></i>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            Educated
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Tara Westover
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Memoir
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                9780399590504
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span
                      className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"
                  >Checked Out</span
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
                                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                                    title="Edit"
                                >
                                    <i className="fas fa-edit"></i>
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
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div
                                        className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center"
                                    >
                                        <i className="fas fa-book text-indigo-600"></i>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            Atomic Habits
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                James Clear
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                Self-Help
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                9780735211292
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span
                      className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                  >Available</span
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
                                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                                    title="Edit"
                                >
                                    <i className="fas fa-edit"></i>
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
                <div
                    className="p-4 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between"
                >
                    <span className="text-sm text-gray-600">Showing 1-3 of 1248 books</span>
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
    );
};