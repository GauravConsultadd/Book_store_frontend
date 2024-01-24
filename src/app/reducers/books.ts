import { createReducer, on } from "@ngrx/store";
import { Book } from "../models/book";
import { getAllBooks, getAllBooksFailure, getAllBooksSuccess } from "../actions/books";

export interface bookState {
    loading: boolean,
    books: Book[],
    error: any
}

export const initialState : bookState= {
    loading: false,
    error: null,
    books: []
}

export const bookReducer = createReducer(
    initialState,
    on(getAllBooks , state=> ({...state,loading: true})),
    on(getAllBooksSuccess , (state, {books})=> ({...state,loading: false,books,error: null})),
    on(getAllBooksFailure, (state,{error})=> ({...state,loading: false,error}))
)