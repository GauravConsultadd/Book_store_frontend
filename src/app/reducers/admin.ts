import { createReducer, on } from "@ngrx/store";
import { Genre } from "../models/Genre";
import { Book } from "../models/book";
import { User } from "../models/user";
import { changeRole, changeRoleFailure, changeRoleSuccess, getAllUser, getAllUserFailure, getAllUserSuccess } from "../actions/user";
import { getAllOrders, getAllOrdersFailure, getAllOrdersSuccess } from "../actions/orders";
import { AdminOrderModel } from "../models/order";

export interface adminState {
    loading: boolean
    users: User[]
    orders: AdminOrderModel[]
    error: any
}

export const initialState : adminState= {
    loading: false,
    users: [],
    orders: [],
    error: null
}

export const adminReducer = createReducer(
    initialState,
    on(getAllUser,(state)=> ({...state,loading: true})),
    on(getAllUserSuccess,(state,{users})=> ({...state,loading: false,users})),
    on(getAllUserFailure,(state,{error})=> ({...state,loading: false,error})),

    on(getAllOrders,(state)=> ({...state,loading: true})),
    on(getAllOrdersSuccess,(state,{orders})=> ({...state,orders,loading: false})),
    on(getAllOrdersFailure,(state,{error})=> ({...state,error,loading: false})),

    on(changeRole,(state)=> ({...state,loading: true})),
    on(changeRoleSuccess,(state,{users})=> ({...state,loading: false,users})),
    on(changeRoleFailure,(state,{error})=> ({...state,loading: false,error}))
)