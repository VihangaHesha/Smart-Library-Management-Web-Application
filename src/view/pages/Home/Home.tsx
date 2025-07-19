export function Home() {
    return (
        <div
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6"
        >
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Library Dashboard</h1>
                <p className="text-gray-600">
                    Welcome back! Here's what's happening today.
                </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
                <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
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
    );
}