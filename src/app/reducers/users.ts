import { createReducer,on } from "@ngrx/store"
import { User } from "../models/user"
import { forgotPassword, forgotPasswordFailure, forgotPasswordSuccess, getCurrentUser, getCurrentUserFailure, getCurrentUserSuccess, loadUser, loadUserFailure, loadUserSuccess, logginUser, logginUserFailure, logginUserSuccess, logoutUser, logoutUserFailure, logoutUserSuccess, registerUser, registerUserFailure, registerUserSuccess, resetPassword, resetPasswordFailure, resetPasswordSuccess } from "../actions/user"
// import { CartItem } from "../models/cartItem"

export interface userState {
    loading: boolean
    user: User|null,
    error: any,
    isLoggedOut: boolean
}
export const initialState: userState={user: null,loading: false,error: null,isLoggedOut: false}

export const userReducer = createReducer(
    initialState,
    on(registerUser, (state)=> ({...state,loading: true})),
    on(registerUserSuccess, (state, { user }) => ({ ...state,loading: false,error:null,isLoggedOut: true /* update state with the user data */ })),
    on(registerUserFailure, (state, {error}) => ({...state,error,loading: false,isLoggedOut: true})),

    on(logginUser,(state => ({...state,loading: true}))),
    on(logginUserSuccess,(state, {user}) => ({...state,user,loading: false,error:null,isLoggedOut: false})),
    on(logginUserFailure,((state, {error}) => ({...state,error,isLoggedOut: true,loading: false,}))),

    on(loadUser,(state => ({...state, loading: true}))),
    on(loadUserSuccess,(state,{access_token,refresh_token})=> {
        localStorage.setItem('refresh_token', refresh_token)
        localStorage.setItem('access_token', access_token)
        return {...state,error: null}
    }),
    on(logginUserFailure,(state, {error}) => {
        alert("Please check login credentials")
        return {...state,error,loading: false}
    }),

    on(getCurrentUser, state => ({ ...state, loading: true })),
    on(getCurrentUserSuccess, (state, {user}) => ({ ...state,user,loading: false,error: null,isLoggedOut: false })),
    on(getCurrentUserFailure, (state, {error}) => ({ ...state,error,user: null, loading: false,isLoggedOut: true })),

    on(logoutUser, state => ({...state,loading: true})),
    on(logoutUserSuccess, state => {localStorage.clear();return ({...state,loading: false,error: null,user: null,isLoggedOut:true})}),
    on(logoutUserFailure, (state,{error}) => ({...state,loading: false,error})),

    on(forgotPassword,state => ({...state,loading: true})),
    on(forgotPasswordSuccess,(state) => ({...state,loading: false})),
    on(forgotPasswordFailure,(state,{error}) => ({...state,loading: false,error: error})),

    on(resetPassword,(state)=> ({...state,loading: true})),
    on(resetPasswordSuccess,(state)=> ({...state,loading: false})),
    on(resetPasswordFailure,(state,{error})=> ({...state,loading: false,error})),
)


