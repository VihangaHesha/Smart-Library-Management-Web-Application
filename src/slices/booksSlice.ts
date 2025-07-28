import type {BookData} from "../model/BookData.ts"
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

// Enhanced mock data for demonstration
const mockBooks: BookData[] = [
    {
        id: 1,
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self-Help",
        quantity: 5,
        status: "Available"
    },
    {
        id: 2,
        title: "The Silent Patient",
        author: "Alex Michaelides",
        category: "Thriller",
        quantity: 2,
        status: "Checked Out"
    },
    {
        id: 3,
        title: "Educated",
        author: "Tara Westover",
        category: "Memoir",
        quantity: 0,
        status: "Overdue"
    }
];

interface BookState {
    list : BookData[],
    loading: boolean;
    error: string | null;
}

const initialState : BookState = {
    list : [],
    loading: false,
    error: null
}

export const getAllBooks = createAsyncThunk(
    "books/getAllBooks",
    async () => {
        // TODO: Replace with actual API call
        // const response = await fetch("/api/books");
        // return await response.json();
        
        // Use mock data for now, but also try to fetch from public folder as fallback
        try {
            const response = await fetch("./book.json");
            const data = await response.json();
            return [...data, ...mockBooks.slice(3)]; // Combine with additional mock data
        } catch {
            return mockBooks;
        }
    }
)

export const addBook = createAsyncThunk(
    "books/addBook",
    async (bookData: Omit<BookData, 'id'>) => {
        // TODO: Replace with actual API call
        // const response = await fetch("/api/books", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(bookData)
        // });
        // return await response.json();
        
        const newBook: BookData = {
            ...bookData,
            id: Date.now(), // Generate temporary ID
        };
        return newBook;
    }
);

export const updateBook = createAsyncThunk(
    "books/updateBook",
    async (bookData: BookData) => {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/books/${bookData.id}`, {
        //     method: "PUT",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(bookData)
        // });
        // return await response.json();
        
        return bookData;
    }
);

export const deleteBook = createAsyncThunk(
    "books/deleteBook",
    async (bookId: number) => {
        // TODO: Replace with actual API call
        // await fetch(`/api/books/${bookId}`, { method: "DELETE" });
        
        return bookId;
    }
);
export const overDueBooks = createAsyncThunk(
    "books/overDueBooks",
    async () => {
        // TODO: Replace with actual API call
        // const response = await fetch("/api/books?status=overdue");
        // return await response.json();
        
        try {
            const response = await fetch("./book.json");
            const data: BookData[] = await response.json();
            const allBooks = [...data, ...mockBooks.slice(3)];
            return allBooks.filter(book => book.status === "Overdue");
        } catch {
            return mockBooks.filter(book => book.status === "Overdue");
        }
    }
);

export const getBooksByCategory = createAsyncThunk(
    "books/getBooksByCategory",
    async (category: string) => {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/books?category=${category}`);
        // return await response.json();
        
        try {
            const response = await fetch("./book.json");
            const data: BookData[] = await response.json();
            const allBooks = [...data, ...mockBooks.slice(3)];
            return allBooks.filter(book => book.category === category);
        } catch {
            return mockBooks.filter(book => book.category === category);
        }
    }
);

const bookSlice = createSlice({
    name : 'books',
    initialState,
    reducers : {},
    extraReducers: (builder)=> {
        builder
            // Get all books
            .addCase(getAllBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload
            })
            .addCase(getAllBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch books";
            })
            
            // Add book
            .addCase(addBook.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            
            // Update book
            .addCase(updateBook.fulfilled, (state, action) => {
                const index = state.list.findIndex(book => book.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            
            // Delete book
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.list = state.list.filter(book => book.id !== action.payload);
            })
            
            // Overdue books
            .addCase(overDueBooks.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(overDueBooks.rejected, (state, action) => {
                state.error = action.error.message || "Failed to fetch overdue books";
            })
            
            // Books by category
            .addCase(getBooksByCategory.fulfilled, (state, action) => {
                state.list = action.payload;
            })
    }
})

export default bookSlice.reducer