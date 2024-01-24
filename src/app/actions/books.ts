import { createAction, props } from "@ngrx/store";
import { Book } from "../models/book";

export const getAllBooks = createAction('GET_ALL_BOOK')
export const getAllBooksSuccess = createAction('GET_ALL_BOOK_SUCCESS',props<{books: Book[]}>())
export const getAllBooksFailure = createAction('GET_ALL_BOOK_FAILURE',props<{error: any}>())

export const getMyInventory = createAction('GET_MY_INVENTORY')
export const getMyInventorySuccess = createAction('GET_MY_INVENTORY_SUCCESS',props<{books: Book[]}>())
export const getMyInventoryFailure = createAction('GET_MY_INVENTORY_FAILURE',props<{error: any}>())