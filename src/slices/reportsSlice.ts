import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ReportData, BookCategoryReport, MemberActivityReport } from "../model/ReportData";

interface ReportState {
    dashboardStats: ReportData | null;
    categoryReport: BookCategoryReport[];
    memberActivityReport: MemberActivityReport[];
    loading: boolean;
    error: string | null;
}

const initialState: ReportState = {
    dashboardStats: null,
    categoryReport: [],
    memberActivityReport: [],
    loading: false,
    error: null
};

// Mock data for demonstration
const mockDashboardStats: ReportData = {
    totalBooks: 1248,
    activeMembers: 342,
    booksCheckedOut: 87,
    overdueBooks: 14,
    monthlyGrowth: {
        books: 12,
        members: 8,
        checkouts: -3,
        overdue: 2
    }
};

const mockCategoryReport: BookCategoryReport[] = [
    { category: "Fiction", count: 450, percentage: 36 },
    { category: "Non-Fiction", count: 320, percentage: 26 },
    { category: "Science", count: 200, percentage: 16 },
    { category: "History", count: 150, percentage: 12 },
    { category: "Biography", count: 128, percentage: 10 }
];

const mockMemberActivityReport: MemberActivityReport[] = [
    {
        memberId: "M-10234",
        memberName: "Emily Brown",
        booksCheckedOut: 5,
        overdueBooks: 1,
        totalFines: 2.50
    },
    {
        memberId: "M-10235",
        memberName: "David Lee",
        booksCheckedOut: 3,
        overdueBooks: 0,
        totalFines: 0
    },
    {
        memberId: "M-10236",
        memberName: "Priya Singh",
        booksCheckedOut: 2,
        overdueBooks: 1,
        totalFines: 3.50
    }
];

// Async thunks for API calls (currently using mock data)
export const getDashboardStats = createAsyncThunk(
    "reports/getDashboardStats",
    async () => {
        // TODO: Replace with actual API call
        // const response = await fetch("/api/reports/dashboard");
        // return await response.json();
        
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockDashboardStats;
    }
);

export const getCategoryReport = createAsyncThunk(
    "reports/getCategoryReport",
    async () => {
        // TODO: Replace with actual API call
        // const response = await fetch("/api/reports/categories");
        // return await response.json();
        
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockCategoryReport;
    }
);

export const getMemberActivityReport = createAsyncThunk(
    "reports/getMemberActivityReport",
    async () => {
        // TODO: Replace with actual API call
        // const response = await fetch("/api/reports/member-activity");
        // return await response.json();
        
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockMemberActivityReport;
    }
);

const reportsSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Dashboard stats
            .addCase(getDashboardStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getDashboardStats.fulfilled, (state, action) => {
                state.loading = false;
                state.dashboardStats = action.payload;
            })
            .addCase(getDashboardStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch dashboard stats";
            })
            
            // Category report
            .addCase(getCategoryReport.fulfilled, (state, action) => {
                state.categoryReport = action.payload;
            })
            
            // Member activity report
            .addCase(getMemberActivityReport.fulfilled, (state, action) => {
                state.memberActivityReport = action.payload;
            });
    }
});

export default reportsSlice.reducer;