import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import {getAllBooks} from "../../../slices/booksSlice.ts";
import {Book} from "../../common/Book/Book.tsx";
import {Link} from "react-router-dom";

export function Home() {

    const dispatch = useDispatch<AppDispatch>();
    const {list} = useSelector((state: RootState) => state.books);
    useEffect(() => {
        dispatch(getAllBooks())
    }, [dispatch]);

    return (
        <div className="container mx-auto px-4 py-6">
            {/*Dashboard Header*/}
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
                </div>
            </div>
            {/*Stats Cards*/}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/*Recently Added Books*/}
                <div className="lg:col-span-2 bg-white rounded-lg shadow">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Recently Added Books
                        </h2>
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
                                {
                                    list.map((book) => (
                                        <Book key={book.id} data={book}/>
                                    ))
                                }
                                </tbody>
                        </table>
                        <div className="p-4 border-t border-gray-200 text-center">
                            <Link to='/books'>
                                <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                                View All Books
                                </button>
                            </Link>
                        </div>
                    </div>
                    </div>
                    {/*Quick Actions*/}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
                        </div>
                        <div className="p-4 grid grid-cols-2 gap-4">
                            <button
                                className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 p-4 rounded-lg flex flex-col items-center transition"
                            >
                                <i className="fas fa-book-medical text-2xl mb-2"></i>
                                <span>Add Book</span>
                            </button>
                            <button
                                className="bg-green-100 hover:bg-green-200 text-green-800 p-4 rounded-lg flex flex-col items-center transition"
                            >
                                <i className="fas fa-user-plus text-2xl mb-2"></i>
                                <span>Add Member</span>
                            </button>
                            <button
                                className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 p-4 rounded-lg flex flex-col items-center transition"
                            >
                                <i className="fas fa-exchange-alt text-2xl mb-2"></i>
                                <span>Check Out</span>
                            </button>
                            <button
                                className="bg-blue-100 hover:bg-blue-200 text-blue-800 p-4 rounded-lg flex flex-col items-center transition"
                            >
                                <i className="fas fa-undo-alt text-2xl mb-2"></i>
                                <span>Return Book</span>
                            </button>
                            <button
                                className="bg-purple-100 hover:bg-purple-200 text-purple-800 p-4 rounded-lg flex flex-col items-center transition"
                            >
                                <i className="fas fa-search text-2xl mb-2"></i>
                                <span>Search Books</span>
                            </button>
                            <button
                                className="bg-red-100 hover:bg-red-200 text-red-800 p-4 rounded-lg flex flex-col items-center transition"
                            >
                                <i className="fas fa-exclamation-triangle text-2xl mb-2"></i>
                                <span>Overdue</span>
                            </button>
                        </div>
                    </div>
                </div>
                {/*Overdue Books*/}
                <div className="bg-white rounded-lg shadow mb-6">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">Overdue Books</h2>
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
                                Due Date
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Days Overdue
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
                                <div className="text-sm text-gray-500">F. Scott Fitzgerald</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    John Smith
                                </div>
                                <div className="text-sm text-gray-500">john@example.com</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                May 15, 2023
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                      className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                  >7 days</span
                  >
                            </td>
                            <td
                                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                            >
                                $3.50
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                                    <i className="fas fa-envelope"></i>
                                </button>
                                <button className="text-green-600 hover:text-green-900">
                                    <i className="fas fa-check"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    To Kill a Mockingbird
                                </div>
                                <div className="text-sm text-gray-500">Harper Lee</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    Sarah Johnson
                                </div>
                                <div className="text-sm text-gray-500">sarah@example.com</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                May 18, 2023
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                      className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800"
                  >4 days</span
                  >
                            </td>
                            <td
                                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                            >
                                $2.00
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                                    <i className="fas fa-envelope"></i>
                                </button>
                                <button className="text-green-600 hover:text-green-900">
                                    <i className="fas fa-check"></i>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-gray-200 text-center">
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium">
                        View All Overdue Books
                    </button>
                </div>
            </div>
        </div>
    );
}