import { createReducer,on } from "@ngrx/store"
import { User } from "../models/user"
import { getCurrentUser, getCurrentUserFailure, getCurrentUserSuccess, loadUser, loadUserFailure, loadUserSuccess, logginUser, logginUserFailure, logginUserSuccess, logoutUser, logoutUserFailure, logoutUserSuccess, registerUser, registerUserFailure, registerUserSuccess } from "../actions/user"
// import { CartItem } from "../models/cartItem"

export interface userState {
    loading: boolean
    user: User|null,
    error: any
}
export const initialState: userState={user: null,loading: false,error: null}

export const userReducer = createReducer(
    initialState,
    on(registerUser, (state)=> ({...state,loading: true})),
    on(registerUserSuccess, (state, { user }) => ({ ...state,user,loading: false,error:null /* update state with the user data */ })),
    on(registerUserFailure, (state, {error}) => ({...state,error: error,loading: false})),

    on(logginUser,(state => ({...state,loading: true}))),
    on(logginUserSuccess,(state, {user}) => ({...state,user,loading: false,error:null})),
    on(logginUserFailure,((state, {error}) => ({...state,error,loading: false}))),

    on(loadUser,(state => ({...state, loading: true}))),
    on(loadUserSuccess,(state,{access_token,refresh_token})=> {
        localStorage.setItem('refresh_token', refresh_token)
        localStorage.setItem('access_token', access_token)
        return {...state,error: null}
    }),
    on(logginUserFailure,(state, {error}) => {
        alert("Please login")
        return {...state,error,loading: false}
    }),

    on(getCurrentUser, state => ({ ...state, loading: true })),
    on(getCurrentUserSuccess, (state, {user}) => ({ ...state,user,loading: false,error: null })),
    on(getCurrentUserFailure, (state, {error}) => ({ ...state,error,user: null, loading: false })),

    on(logoutUser, state => ({...state,loading: true})),
    on(logoutUserSuccess, state => {localStorage.clear();return ({...state,loading: false,error: null,user: null})}),
    on(logoutUserFailure, (state,{error}) => ({...state,loading: false,error})),
)


