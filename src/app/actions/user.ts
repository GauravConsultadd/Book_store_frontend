import { createAction, props } from "@ngrx/store"
import { User } from "../models/user"


export const initApp = createAction('INIT_APP')

export const registerUser = createAction('[RegisterComponent] REGISTER_USER',props<{username: string,email: string,password: string,role: string}>())
export const registerUserSuccess = createAction('REGISTER_USER_SUCCESS',props<{user:User}>())
export const registerUserFailure = createAction('REGISTER_USER_FAILURE',props<{error: any}>())

export const logginUser = createAction('[LoginComponent] LOGGING_USER',props<{email: string,password: string}>())
export const logginUserSuccess = createAction('LOGGING_USER_SUCCESS',props<{user: User}>())
export const logginUserFailure = createAction('LOGGING_USER_FAILURE',props<{error: any}>())

export const loadUser = createAction('LOAD_USER',props<{token: string}>())
export const loadUserSuccess = createAction('LOAD_LOGGIN_USER',props<{access_token: string,refresh_token: string}>())
export const loadUserFailure = createAction('LOGGIN_USER_FAILURE',props<{error: any}>())

export const getCurrentUser = createAction('GET_USER')
export const getCurrentUserSuccess = createAction('GET_USER_SUCCESS',props<{user: User}>())
export const getCurrentUserFailure = createAction('GET_USER_FAILURE',props<{error: any}>())

export const logoutUser = createAction('LOGOUT_USER')
export const logoutUserSuccess = createAction('LOGOUT_USER_SUCCESS')
export const logoutUserFailure = createAction('LOGOUT_USER_FAILURE',props<{error: any}>())

export const getAllUser = createAction('GET_ALL_USER')
export const getAllUserSuccess = createAction('GET_ALL_USER_SUCCESS',props<{users: User[]}>())
export const getAllUserFailure = createAction('GET_ALL_USER_FAILURE',props<{error: any}>())