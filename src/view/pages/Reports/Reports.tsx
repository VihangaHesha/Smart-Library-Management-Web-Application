import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store/store';
import { getDashboardStats, getCategoryReport, getMemberActivityReport } from '../../../slices/reportsSlice';
import { LoadingSpinner } from '../../common/LoadingSpinner/LoadingSpinner';

export const Reports = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { dashboardStats, categoryReport, memberActivityReport, loading, error } = useSelector((state: RootState) => state.reports);
    
    const [reportType, setReportType] = useState<'overview' | 'categories' | 'members'>('overview');
    const [dateRange, setDateRange] = useState('month');

    useEffect(() => {
        // Load all report data
        dispatch(getDashboardStats());
        dispatch(getCategoryReport());
        dispatch(getMemberActivityReport());
    }, [dispatch]);

    const handleGenerateReport = () => {
        // TODO: Implement report generation based on selected filters
        // This would typically call different API endpoints based on reportType and dateRange
        console.log(`Generating ${reportType} report for ${dateRange}`);
        
        switch (reportType) {
            case 'overview':
                dispatch(getDashboardStats());
                break;
            case 'categories':
                dispatch(getCategoryReport());
                break;
            case 'members':
                dispatch(getMemberActivityReport());
                break;
        }
    };

    const formatGrowthPercentage = (value: number) => {
        const sign = value >= 0 ? '+' : '';
        const color = value >= 0 ? 'text-green-500' : 'text-red-500';
        const icon = value >= 0 ? 'fa-arrow-up' : 'fa-arrow-down';
        
        return (
            <p className={`${color} text-sm mt-2`}>
                <i className={`fas ${icon}`}></i> {sign}{value}% from last month
            </p>
        );
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-6">
                <LoadingSpinner size="lg" text="Loading reports..." />
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
                        onClick={handleGenerateReport}
                    >
                        <i className="fas fa-chart-bar"></i>
                        <span>Generate Report</span>
                    </button>
                    <select
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value as 'overview' | 'categories' | 'members')}
                        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    >
                        <option value="overview">Overview</option>
                        <option value="categories">Categories</option>
                        <option value="members">Member Activity</option>
                    </select>
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    >
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="quarter">This Quarter</option>
                        <option value="year">This Year</option>
                    </select>
                </div>
            </div>
            {/*Report Summery Cards*/}
            {reportType === 'overview' && dashboardStats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Total Books */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500">Total Books</p>
                            <h3 className="text-2xl font-bold">{dashboardStats.totalBooks.toLocaleString()}</h3>
                        </div>
                        <div className="bg-indigo-100 p-3 rounded-full">
                            <i className="fas fa-book text-indigo-600 text-xl"></i>
                        </div>
                    </div>
                    {formatGrowthPercentage(dashboardStats.monthlyGrowth.books)}
                </div>

                {/* Active Members */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500">Active Members</p>
                            <h3 className="text-2xl font-bold">{dashboardStats.activeMembers}</h3>
                        </div>
                        <div className="bg-green-100 p-3 rounded-full">
                            <i className="fas fa-users text-green-600 text-xl"></i>
                        </div>
                    </div>
                    {formatGrowthPercentage(dashboardStats.monthlyGrowth.members)}
                </div>

                {/* Books Checked Out */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500">Books Checked Out</p>
                            <h3 className="text-2xl font-bold">{dashboardStats.booksCheckedOut}</h3>
                        </div>
                        <div className="bg-yellow-100 p-3 rounded-full">
                            <i className="fas fa-exchange-alt text-yellow-600 text-xl"></i>
                        </div>
                    </div>
                    {formatGrowthPercentage(dashboardStats.monthlyGrowth.checkouts)}
                </div>

                {/* Overdue Books */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500">Overdue Books</p>
                            <h3 className="text-2xl font-bold">{dashboardStats.overdueBooks}</h3>
                        </div>
                        <div className="bg-red-100 p-3 rounded-full">
                            <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
                        </div>
                    </div>
                    {formatGrowthPercentage(dashboardStats.monthlyGrowth.overdue)}
                </div>
            </div>
            )}

            {/* Category Report */}
            {reportType === 'categories' && (
                <div className="bg-white rounded-lg shadow mb-6">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">Books by Category</h2>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {categoryReport.map((category) => (
                                <div key={category.category} className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-medium text-gray-900">{category.category}</h3>
                                        <span className="text-sm text-gray-500">{category.percentage}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-indigo-600 h-2 rounded-full" 
                                            style={{ width: `${category.percentage}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{category.count} books</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Member Activity Report */}
            {reportType === 'members' && (
                <div className="bg-white rounded-lg shadow mb-6">
                    <div className="p-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">Member Activity Report</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Member
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Books Checked Out
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Overdue Books
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total Fines
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {memberActivityReport.map((member) => (
                                    <tr key={member.memberId}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {member.memberName}
                                            </div>
                                            <div className="text-sm text-gray-500">{member.memberId}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {member.booksCheckedOut}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {member.overdueBooks}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            ${member.totalFines.toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Detailed Transaction Report (for overview) */}
            {reportType === 'overview' && (
                <div>
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
                                    Educated
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                    Tara Westover
                                </div>
                                <div className="text-xs text-gray-500">Unknown Member</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                2025-01-05
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                2025-01-19
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
                        </tbody>
                    </table>
                </div>
            </div>
            )}
        </div>
    );
};