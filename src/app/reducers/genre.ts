import { createReducer, on } from "@ngrx/store";
import { Genre } from "../models/Genre";
import { createGenre, createGenreFailure, createGenreSuccess, getAllGenre, getAllGenreFailure, getAllGenreSuccess, updateGenre, updateGenreFailure, updateGenreSuccess } from "../actions/genre";
import { deleteBook, deleteBookFailure, deleteBookSuccess } from "../actions/books";

export interface genreState {
    genres: Genre[],
    loading: boolean,
    error: any
}

export const initialState: genreState = {
    genres:[],
    loading: false,
    error: null
}

export const genreReducer =createReducer(
    initialState,
    on(getAllGenre,(state)=> ({...state,loading: true})),
    on(getAllGenreSuccess,(state,{genres})=> ({...state,genres,loading: false})),
    on(getAllGenreFailure,(state,{error})=> ({...state,loading: false,error})),

    on(updateGenre,(state)=> ({...state,loading: true})),
    on(updateGenreSuccess,(state,{genres})=> ({...state,loading: false,genres})),
    on(updateGenreFailure,(state,{error})=> ({...state,loading: false,error})),

    on(deleteBook,(state)=> ({...state,loading: true})),
    on(deleteBookSuccess,(state)=> ({...state,loading: false})),
    on(deleteBookFailure,(state,{error})=> ({...state,loading: false,error})),

    on(createGenre,(state)=> ({...state,loading: true})),
    on(createGenreSuccess,(state,{genres})=> ({...state,loading: false,genres})),
    on(createGenreFailure,(state,{error})=> ({...state,loading: false,error})),
)