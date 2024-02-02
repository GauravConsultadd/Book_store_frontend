import { Injectable } from "@angular/core";
import { BookService } from "../services/book";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import * as bookActions from '../actions/books'
import { catchError, exhaustMap, map, of, switchMap, tap } from "rxjs";


@Injectable()
export class BookEffects {
    getBooks= createEffect(()=> 
        this.actions.pipe(
            ofType(bookActions.getAllBooks),
            exhaustMap(()=> {return this.bookService.getAllBooks().pipe(
                map((res: any)=> bookActions.getAllBooksSuccess({books: res.books})),
                catchError((err)=> {
                    return of(bookActions.getAllBooksFailure({error: err.message}))
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
                    return of(bookActions.getMyInventoryFailure({error: err.message}))
                })
            
            )})
        )
    )

    deleteBook = createEffect(()=> 
        this.actions.pipe(
            ofType(bookActions.deleteBook),
            exhaustMap(({id})=> this.bookService.deleteBook(id).pipe(
                map((res: any) => bookActions.deleteBookSuccess({books: res.books,inventory: res.inventory})),
                catchError((err)=> of(bookActions.deleteBookFailure({error: err}))
            ))
        )
    ))

    updatebook = createEffect(()=>
        this.actions.pipe(
            ofType(bookActions.updateBook),
            exhaustMap(({book})=> this.bookService.updateBook(book).pipe(
                map((res: any) => bookActions.updateBookSuccess({books: res.books,inventory: res.inventory})),
                catchError((err) => of(bookActions.updateBookFailure({error: err})))
            ))
        )
    )

    createBook = createEffect(()=>
        this.actions.pipe(
            ofType(bookActions.createBook),
            exhaustMap(({book})=> this.bookService.createBook(book).pipe(
                map((res: any) => bookActions.createBookSuccess({books: res.books,inventory: res.inventory})),
                catchError((err) => of(bookActions.createBookFailure({error: err})))
            ))
        )
    )

    searchBook = createEffect(()=> 
        this.actions.pipe(
            ofType(bookActions.searchBook),
            switchMap(({searchText,authors,genres})=> this.bookService.searchBook(searchText,authors,genres).pipe(
                map((res: any)=> bookActions.searchBookSuccess({books: res.books})),
                catchError((err: any)=> of(bookActions.searchBookFailure({error: err})))
            ))
        )
    )

    

    constructor(private actions: Actions,private bookService: BookService) {}
}