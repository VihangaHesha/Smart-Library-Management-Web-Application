import type {BookData} from "../model/BookData.ts"
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


interface BookState {
    list : BookData[],
    error :string | null | undefined;
}

const initialState : BookState = {
    list : [],
    error : null
}

export const getAllBooks = createAsyncThunk(
    "books/getAllBooks",
    async () => {
        const response = await fetch("./book.json")
        return await response.json()
    }
)

export const overDueBooks = createAsyncThunk(
    "books/overDueBooks",
    async () => {
        const response = await fetch("./book.json");
        const data: BookData[] = await response.json();

        // Filter only books with status 'Overdue'
        return data.filter(book => book.status === "Overdue");
    }
)

const bookSlice = createSlice({
    name : 'books',
    initialState,
    reducers : {},
    extraReducers: (builder)=> {
        builder
            .addCase((getAllBooks.pending), () => {
                alert("Books Are Loading...")
            })

            .addCase(getAllBooks.fulfilled, (state, action) => {
            state.list = action.payload
        })
            .addCase(overDueBooks.fulfilled, (state, action) => {
                state.list = action.payload
            })
        .addCase(getAllBooks.rejected, (state, action) => {
            state.error = action.error.message
            alert(`Error : ${state.error}`)
            console.log(state.error)
        })
            .addCase(overDueBooks.rejected, (state, action) => {
                state.error = action.error.message
                alert(`Error : ${state.error}`)
                console.log(state.error)
            })
    }
})

export default bookSlice.reducer