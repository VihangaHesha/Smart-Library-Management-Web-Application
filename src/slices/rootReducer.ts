import {combineReducers} from "redux";
import bookReducer from "./booksSlice.ts"
import membersReducer from "./membersSlice.ts";
import transactionsReducer from "./transactionsSlice.ts";
import reportsReducer from "./reportsSlice.ts";

export const rootReducer = combineReducers(
    {
        books: bookReducer,
        members: membersReducer,
        transactions: transactionsReducer,
        reports: reportsReducer
    }
)

export type RootReducerState = ReturnType<typeof rootReducer>