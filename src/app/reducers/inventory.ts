import { createReducer, on } from "@ngrx/store";
import { Book } from "../models/book";
import { createBook, createBookFailure, createBookSuccess, deleteBook, deleteBookFailure, deleteBookSuccess, getMyInventory, getMyInventoryFailure, getMyInventorySuccess, updateBook, updateBookFailure, updateBookSuccess } from "../actions/books";

export interface inventoryState {
    loading: boolean
    books: Book[]
    error: any
}

const initialState : inventoryState = {
    loading: false,
    books: [],
    error: null

}

export const inventoryReducer = createReducer(
    initialState,
    on(getMyInventory,(state) => ({...state,loading: true})),
    on(getMyInventorySuccess,(state,{books}) => ({...state,loading: false,books,error: null})),
    on(getMyInventoryFailure,(state,{error}) => ({...state,loading: false,error})),

    on(deleteBook,(state)=> ({...state,loading: true})),
    on(deleteBookSuccess,(state,{books,inventory})=> ({...state,loading: false,books: inventory,error: null})),
    on(deleteBookFailure,(state,{error})=> ({...state,loading: false,error})),

    on(updateBook,(state)=> ({...state,loading: true})),
    on(updateBookSuccess,(state,{books,inventory})=> ({...state,loading: false,books: inventory,error: null})),
    on(updateBookFailure,(state,{error})=> ({...state,loading: false,error})),

    on(createBook,(state)=> ({...state,loading: true})),
    on(createBookSuccess,(state,{books,inventory})=> ({...state,loading: false,books: inventory,error: null})),
    on(createBookFailure,(state,{error})=> ({...state,loading: false,error})),
)