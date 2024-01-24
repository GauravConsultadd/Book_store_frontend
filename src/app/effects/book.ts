import { Injectable } from "@angular/core";
import { BookService } from "../services/book";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as bookActions from '../actions/books'
import { catchError, exhaustMap, map, of, tap } from "rxjs";


@Injectable()
export class BookEffects {
    getBooks= createEffect(()=> 
        this.actions.pipe(
            ofType(bookActions.getAllBooks),
            exhaustMap(()=> {return this.bookService.getAllBooks().pipe(
                map((res: any)=> bookActions.getAllBooksSuccess({books: res.books})),
                catchError((err)=> {
                    return of(bookActions.getAllBooksFailure(err.message))
                })
            )})
        )
    )

    getMyInventory= createEffect(()=> 
        this.actions.pipe(
            ofType(bookActions.getMyInventory),
            exhaustMap(()=> {return this.bookService.getInventory().pipe(
                map((res: any) => {return bookActions.getMyInventorySuccess({books: res.books})}),
                catchError((err)=> {
                    return of(bookActions.getMyInventoryFailure(err))
                })
            
            )})
        )
    )

    constructor(private actions: Actions,private bookService: BookService) {}
}