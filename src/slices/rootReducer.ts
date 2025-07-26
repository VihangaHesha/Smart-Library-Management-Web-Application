import {combineReducers} from "redux";
import bookReducer from "./booksSlice.ts"

export const rootReducer = combineReducers(
    {
        books :bookReducer
    }
)

export type RootReducerState = ReturnType<typeof rootReducer>