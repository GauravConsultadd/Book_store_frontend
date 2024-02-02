import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CartService } from "../services/cart";
import * as cartActions from '../actions/carts'
import { catchError, exhaustMap, map, of } from "rxjs";
import { User } from "../models/user";

@Injectable()
export class CartEffect {
    addToCart = createEffect(()=>
        this.actions.pipe(
            ofType(cartActions.addToCart),
            exhaustMap(({userId,bookId,price,quantity})=> this.cartService.addToCart(userId,bookId,price,quantity).pipe(
                map((res:any)=> { return cartActions.addToCartSuccess({cart: res.cart})}),
                catchError((err)=> of(cartActions.addToCartFailure({error: err})))
            ))
        )
    )

    getCart = createEffect(()=> 
        this.actions.pipe(
            ofType(cartActions.getCart),
            exhaustMap(()=> this.cartService.getCart().pipe(
                map((res:any)=> cartActions.getCartSuccess({cart: res.cart})),
                catchError((err)=> of(cartActions.getCartFailure({error: err})))
            ))
        )
    )

    removeFromCart = createEffect(()=> 
        this.actions.pipe(
            ofType(cartActions.removeFromCart),
            exhaustMap(({id})=> this.cartService.removeFromCart(id).pipe(
                map((res: any)=> cartActions.removeFromCartSuccess({cart: res.cart})),
                catchError((err)=> of(cartActions.removeFromCartFailure({error: err})))
            ))
        )
    )
    constructor(private actions: Actions,private cartService: CartService) {}
}