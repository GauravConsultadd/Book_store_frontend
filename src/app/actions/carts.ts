import { createAction, props } from "@ngrx/store";
import { Book } from "../models/book";
import { CartItem } from "../models/cartItem";

export const addToCart = createAction('ADD_TO_CART',props<{userId: number,bookId: number,price: number,quantity: number}>())
export const addToCartSuccess = createAction('ADD-TO_CART_SUCCESS',props<{cart: CartItem[]}>())
export const addToCartFailure = createAction('ADD_TO_CART_FAILURE',props<{error: any}>())

export const getCart = createAction('GET_CART')
export const getCartSuccess = createAction('GET_CART_SUCCESS',props<{cart: CartItem[]}>())
export const getCartFailure = createAction('GET_CART_FAILURE',props<{error: any}>())

export const removeFromCart = createAction('REMOVE_FROM_CART',props<{id: number}>())
export const removeFromCartSuccess = createAction('REMOVE_FROM_CART_SUCCESS',props<{cart: CartItem[]}>())
export const removeFromCartFailure = createAction('REMOVE_FROM_CART_SUCCESS',props<{error: any}>())

export const removeAllCart = createAction('REMOVE_ALL_CART')
export const removeAllCartSuccess = createAction('REMOVE_ALL_CART_SUCCESS',props<{cart: CartItem[]}>())
export const removeAllCartFailure = createAction('REMOVE_ALL_CART_FAILURE',props<{error: any}>())