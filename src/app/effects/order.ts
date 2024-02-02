import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { OrderService } from "../services/order";
import * as orderActions from '../actions/orders'
import { catchError, exhaustMap, map, of } from "rxjs";

@Injectable()
export class OrderEffect {

    createOrder = createEffect(()=> (
        this.actions.pipe(
            ofType(orderActions.createOrder),
            exhaustMap(({order})=> this.orderService.createOrder(order).pipe(
                map((res:any)=> orderActions.createOrderSuccess({orders: res.orders})),
                catchError((err)=> of(orderActions.createOrderFailure({error: err})))
            ))
        )
    ))

    getMyOrders = createEffect(()=> (
        this.actions.pipe(
            ofType(orderActions.getMyOrders),
            exhaustMap(()=> this.orderService.getMyOrders().pipe(
                map((res: any) => orderActions.getMyOrdersSuccess({orders: res.orders})),
                catchError((err)=> of(orderActions.getMyOrdersFailure({error: err})))
            ))
        )
    ))

    getAllOrders = createEffect(()=> (
        this.actions.pipe(
            ofType(orderActions.getAllOrders),
            exhaustMap(()=> this.orderService.getAllOrders().pipe(
                map((res: any) => orderActions.getAllOrdersSuccess({orders: res.orders})),
                catchError((err) => of(orderActions.getAllOrdersFailure({error: err})))
            ))
        )
    ))

    constructor(private actions: Actions,private orderService : OrderService) {}
}