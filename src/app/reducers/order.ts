import { createReducer, on } from "@ngrx/store";
import { Order } from "../models/order";
import { createOrder, createOrderFailure, createOrderSuccess, getMyOrders, getMyOrdersFailure, getMyOrdersSuccess } from "../actions/orders";

export interface orderState {
    loading: boolean,
    error: any,
    orders: Order[]
}

export const initialState: orderState = {
    loading: false,
    error: null,
    orders: []
}

export const orderReducer = createReducer(
    initialState,
    on(createOrder,(state)=> ({...state,loading: true})),
    on(createOrderSuccess,(state,{orders})=> ({...state,loading: false,orders})),
    on(createOrderFailure,(state,{error})=> ({...state,loading: true,error})),

    on(getMyOrders,(state)=> ({...state,loading:true})),
    on(getMyOrdersSuccess,(state,{orders})=> ({...state,loading:false,orders})),
    on(getMyOrdersFailure,(state,{error})=> ({...state,loading:false,error})),
)