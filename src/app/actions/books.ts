import { createAction, props } from "@ngrx/store";
import { Book, updateBookModel } from "../models/book";

export const getAllBooks = createAction('GET_ALL_BOOK')
export const getAllBooksSuccess = createAction('GET_ALL_BOOK_SUCCESS',props<{books: Book[]}>())
export const getAllBooksFailure = createAction('GET_ALL_BOOK_FAILURE',props<{error: any}>())

export const getMyInventory = createAction('GET_MY_INVENTORY')
export const getMyInventorySuccess = createAction('GET_MY_INVENTORY_SUCCESS',props<{books: Book[]}>())
export const getMyInventoryFailure = createAction('GET_MY_INVENTORY_FAILURE',props<{error: any}>())

export const deleteBook = createAction('DELETE_BOOK',props<{id:number}>())
export const deleteBookSuccess = createAction('DELETE_BOOK_SUCCESS',props<{books: Book[],inventory: Book[]}>())
export const deleteBookFailure = createAction('DELETE_BOOK_FAILURE',props<{error: any}>())

export const updateBook = createAction('UPDATE_BOOK',props<{book: updateBookModel}>())
export const updateBookSuccess = createAction('UPDATE_BOOK_SUCCESS',props<{books: Book[],inventory: Book[]}>())
export const updateBookFailure = createAction('UPDATE_BOOK_FAILURE',props<{error: any}>())

export const createBook = createAction('CREATE_BOOK',props<{book: updateBookModel}>())
export const createBookSuccess = createAction('CREATE_BOOK_SUCCESS',props<{books: Book[],inventory: Book[]}>())
export const createBookFailure = createAction('CREATE_BOOK_FAILURE',props<{error: any}>())

export const searchBook = createAction('SEARCH_BOOK',props<{searchText: string,authors: string[],genres: string[]}>())
export const searchBookSuccess = createAction('SEARCH_BOOK_SUCCESS',props<{books: Book[]}>())
export const searchBookFailure = createAction('SEARCH_BOOK_FAILURE',props<{error: any}>())