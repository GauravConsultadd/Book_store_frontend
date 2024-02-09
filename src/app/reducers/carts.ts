import { createReducer, on } from "@ngrx/store";
import { CartItem } from "../models/cartItem";
import { addToCart, addToCartFailure, addToCartSuccess, getCart, getCartSuccess, removeAllCart, removeAllCartSuccess, removeFromCart, removeFromCartFailure, removeFromCartSuccess } from "../actions/carts";
import { logoutUser, logoutUserFailure, logoutUserSuccess } from "../actions/user";

export interface cartItemState {
    loading: boolean
    cart: CartItem[]
    error: any
}

export const initialState: cartItemState={cart: [],loading: false,error: null}

export const cartItemReducer=createReducer(
    initialState,
    on(addToCart,state=> ({...state,loading: true})),
    on(addToCartSuccess,(state,{cart})=> {return ({...state,cart,loading: false,error: null})}),
    on(addToCartFailure,(state,{error})=> ({...state,error,loading: false})),

    on(getCart,state => ({...state,loading: true})),
    on(getCartSuccess,(state,{cart})=> ({...state,cart,loading: false,error: null})),
    on(addToCartFailure,(state,{error})=> ({...state,error,loading: false})),

    on(removeFromCart,state => ({...state,loading:true})),
    on(removeFromCartSuccess,(state,{cart}) => ({...state,loading:false,cart,error: null})),
    on(removeFromCartFailure,(state,{error}) => ({...state,loading:true,error})),

    on(removeAllCart,(state) => ({...state,loading: true})),
    on(removeAllCartSuccess,(state,{cart}) => ({...state,loading: false,cart})),
    on(removeFromCartFailure,(state,{error}) => ({...state,loading: false,error})),

)