export function Members() {
    return (
        <div className="container mx-auto px-4 py-6">
            {/*Page Header*/}
            <div
                className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6"
            >
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Members</h1>
                    <p className="text-gray-600">View and manage library members.</p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
                        // onClick="showNotification('Member successfully added!')"
                    >
                        <i className="fas fa-user-plus"></i>
                        <span>Add Member</span>
                    </button>
                    <button
                        className="bg-white hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-lg border border-gray-300 flex items-center space-x-2 transition"
                    >
                        <i className="fas fa-filter"></i>
                        <span>Filter</span>
                    </button>
                </div>
            </div>
            {/*Member Table*/}
            <div className="bg-white rounded-lg shadow">
                <div
                    className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:justify-between md:items-center"
                >
                    <h2 className="text-lg font-semibold text-gray-800">All Members</h2>
                    <div className="mt-2 md:mt-0 flex space-x-2">
                        <input
                            type="text"
                            className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            placeholder="Search by name, email, ID..."
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
                                Member ID
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Name
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Email
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Join Date
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
                                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                            >
                                M-10234
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap flex items-center">
                                <img
                                    className="h-9 w-9 rounded-full mr-3"
                                    src="https://randomuser.me/api/portraits/women/65.jpg"
                                    alt="Emily Brown"
                                />
                                <span className="text-sm font-medium text-gray-900"
                                >Emily Brown</span
                                >
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                emily.brown@example.com
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                2024-03-15
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span
                      className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
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
                            <td
                                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                            >
                                M-10235
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap flex items-center">
                                <img
                                    className="h-9 w-9 rounded-full mr-3"
                                    src="https://randomuser.me/api/portraits/men/86.jpg"
                                    alt="David Lee"
                                />
                                <span className="text-sm font-medium text-gray-900"
                                >David Lee</span
                                >
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                david.lee@example.com
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                2024-02-22
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span
                      className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
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
                            <td
                                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                            >
                                M-10236
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap flex items-center">
                                <img
                                    className="h-9 w-9 rounded-full mr-3"
                                    src="https://randomuser.me/api/portraits/women/76.jpg"
                                    alt="Priya Singh"
                                />
                                <span className="text-sm font-medium text-gray-900"
                                >Priya Singh</span
                                >
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                priya.singh@example.com
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                2023-12-02
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span
                      className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"
                  >Inactive</span
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
            </div>
        </div>
    );
}