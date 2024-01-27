import { createAction, props } from "@ngrx/store";
import { AdminOrderModel, Order, createOrderModel } from "../models/order";

export const getMyOrders = createAction('GET_MY_ORDERS')
export const getMyOrdersSuccess = createAction('GET_MY_ORDERS_SUCCESS',props<{orders: Order[]}>())
export const getMyOrdersFailure = createAction('GET_MY_ORDERS_FAILURE',props<{error: any}>())

export const createOrder = createAction('CREATE_ORDER',props<{order: createOrderModel}>())
export const createOrderSuccess = createAction('CREATE_ORDER_SUCCESS',props<{orders: Order[]}>())
export const createOrderFailure = createAction('CREATE_ORDER_FAILURE',props<{error: any}>())

export const getAllOrders = createAction('GET_ALL_ORDERS')
export const getAllOrdersSuccess = createAction('GET_ALL_ORDERS_SUCCESS',props<{orders: AdminOrderModel[]}>())
export const getAllOrdersFailure = createAction('GET_ALL_ORDERS_FAILURE',props<{error: any}>())

