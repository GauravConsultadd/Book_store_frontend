import { createReducer, on } from "@ngrx/store";
import { Book } from "../models/book";
import { getAllAuthors, getAllAuthorsFailure, getAllAuthorsSuccess, getGenreNames, getGenreNamesFailure, getGenreNamesSuccess } from "../actions/genre";

export interface searchState {
    genres: string[],
    authors: string[],
    error: any,
    loading: boolean,
    books: Book[]
}

export const initialState: searchState = {
    genres: [],
    authors: [],
    error: null,
    loading: false,
    books: []
}


export const searchReducer = createReducer(
    initialState,
    on(getAllAuthors,(state)=> ({...state,loading: true})),
    on(getAllAuthorsSuccess,(state,{authors})=> ({...state,loading: false,authors})),
    on(getAllAuthorsFailure,(state,{error})=> ({...state,loading: false,error})),

    on(getGenreNames,(state)=> ({...state,loading: true})),
    on(getGenreNamesSuccess,(state,{genres})=> ({...state,loading: false,genres})),
    on(getGenreNamesFailure,(state,{error})=> ({...state,loading: false,error})),
)