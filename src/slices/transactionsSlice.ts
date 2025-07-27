import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { TransactionData } from "../model/TransactionData";

interface TransactionState {
    list: TransactionData[];
    loading: boolean;
    error: string | null;
}

const initialState: TransactionState = {
    list: [],
    loading: false,
    error: null
};

// Mock data for demonstration
const mockTransactions: TransactionData[] = [
    {
        id: "TXN-10123",
        bookId: 2,
        bookTitle: "The Silent Patient",
        bookAuthor: "Alex Michaelides",
        memberId: "M-10234",
        memberName: "Emily Brown",
        memberEmail: "emily.brown@example.com",
        type: "Borrow",
        borrowDate: "2025-01-15",
        dueDate: "2025-01-29",
        status: "Active"
    },
    {
        id: "TXN-10124",
        bookId: 3,
        bookTitle: "Educated",
        bookAuthor: "Tara Westover",
        memberId: "M-10235",
        memberName: "David Lee",
        memberEmail: "david.lee@example.com",
        type: "Return",
        borrowDate: "2025-01-10",
        dueDate: "2025-01-24",
        returnDate: "2025-01-20",
        status: "Completed"
    },
    {
        id: "TXN-10125",
        bookId: 1,
        bookTitle: "Atomic Habits",
        bookAuthor: "James Clear",
        memberId: "M-10236",
        memberName: "Priya Singh",
        memberEmail: "priya.singh@example.com",
        type: "Borrow",
        borrowDate: "2025-01-05",
        dueDate: "2025-01-19",
        status: "Overdue",
        fine: 3.50
    }
];

// Async thunks for API calls (currently using mock data)
export const getAllTransactions = createAsyncThunk(
    "transactions/getAllTransactions",
    async () => {
        // TODO: Replace with actual API call
        // const response = await fetch("/api/transactions");
        // return await response.json();
        
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockTransactions;
    }
);

export const addTransaction = createAsyncThunk(
    "transactions/addTransaction",
    async (transactionData: Omit<TransactionData, 'id'>) => {
        // TODO: Replace with actual API call
        // const response = await fetch("/api/transactions", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(transactionData)
        // });
        // return await response.json();
        
        const newTransaction: TransactionData = {
            ...transactionData,
            id: `TXN-${Date.now()}`,
        };
        return newTransaction;
    }
);

export const updateTransaction = createAsyncThunk(
    "transactions/updateTransaction",
    async (transactionData: TransactionData) => {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/transactions/${transactionData.id}`, {
        //     method: "PUT",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(transactionData)
        // });
        // return await response.json();
        
        return transactionData;
    }
);

export const deleteTransaction = createAsyncThunk(
    "transactions/deleteTransaction",
    async (transactionId: string) => {
        // TODO: Replace with actual API call
        // await fetch(`/api/transactions/${transactionId}`, { method: "DELETE" });
        
        return transactionId;
    }
);

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get all transactions
            .addCase(getAllTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(getAllTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch transactions";
            })
            
            // Add transaction
            .addCase(addTransaction.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            
            // Update transaction
            .addCase(updateTransaction.fulfilled, (state, action) => {
                const index = state.list.findIndex(transaction => transaction.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            
            // Delete transaction
            .addCase(deleteTransaction.fulfilled, (state, action) => {
                state.list = state.list.filter(transaction => transaction.id !== action.payload);
            });
    }
});

export default transactionsSlice.reducer;