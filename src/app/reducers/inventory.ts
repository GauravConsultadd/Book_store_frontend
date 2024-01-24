import { createReducer, on } from "@ngrx/store";
import { Book } from "../models/book";
import { getMyInventory, getMyInventoryFailure, getMyInventorySuccess } from "../actions/books";

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
)