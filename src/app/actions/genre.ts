import { createAction, props } from "@ngrx/store";
import { Genre } from "../models/Genre";

export const getAllGenre = createAction('GET_ALL_GENRE')
export const getAllGenreSuccess = createAction('GET_ALL_GENRE_SUCCESS',props<{genres: Genre[]}>())
export const getAllGenreFailure = createAction('GET_ALL_GENRE_FAILURE',props<{error: any}>())

export const createGenre = createAction('CREATE_GENRE',props<{name: string,description: string}>())
export const createGenreSuccess = createAction('CREATE_GENRE_SUCCESS',props<{genres: Genre[]}>())
export const createGenreFailure = createAction('CREATE_GENRE_FAILURE',props<{error: any}>())

export const deleteGenre = createAction('DELETE_GENRE',props<{id: number}>())
export const deleteGenreSuccess = createAction('DELETE_GENRE_SUCCESS',props<{genres: Genre[]}>())
export const deleteGenreFailure = createAction('DELETE_GENRE_FAILURE',props<{error: any}>())

export const updateGenre = createAction('UPDATE_GENRE',props<{name: string,description: string,id: number}>())
export const updateGenreSuccess = createAction('UPDATE_GENRE_SUCCESS',props<{genres: Genre[]}>())
export const updateGenreFailure = createAction('UPDATE_GENRE_FAILURE',props<{error:any}>())