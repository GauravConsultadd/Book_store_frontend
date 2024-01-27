import { createReducer, on } from "@ngrx/store";
import { Book } from "../models/book";
import { createBook, createBookFailure, createBookSuccess, deleteBook, deleteBookFailure, deleteBookSuccess, getAllBooks, getAllBooksFailure, getAllBooksSuccess, searchBook, searchBookFailure, searchBookSuccess, updateBook, updateBookFailure, updateBookSuccess } from "../actions/books";

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
    on(getAllBooksFailure, (state,{error})=> ({...state,loading: false,error})),

    on(deleteBook,state=> ({...state,loading: true})),
    on(deleteBookSuccess,(state,{books,inventory})=> ({...state,loading: false,books,error: null})),
    on(deleteBookFailure,(state,{error})=> ({...state,loading: false,error})),

    on(updateBook,state=> ({...state,loading: true})),
    on(updateBookSuccess,(state,{books,inventory})=> ({...state,loading: false,books,error: null})),
    on(updateBookFailure,(state,{error})=> ({...state,loading: false,error})),

    on(createBook,state=> ({...state,loading: true})),
    on(createBookSuccess,(state,{books,inventory})=> ({...state,loading: false,books,error: null})),
    on(createBookFailure,(state,{error})=> ({...state,loading: false,error})),

    on(searchBook,state => ({...state,loading: true})),
    on(searchBookSuccess,(state,{books}) => ({...state,loading: true,books})),
    on(searchBookFailure,(state,{error}) => ({...state,loading: true,error})),
)