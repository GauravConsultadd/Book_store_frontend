import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { GenreService } from "../services/genre";
import * as genreActions from '../actions/genre'
import { catchError, exhaustMap, map, of } from "rxjs";

@Injectable()
export class GenreEffect {
    getAllGenres = createEffect(()=>
        this.actions.pipe(
            ofType(genreActions.getAllGenre),
            exhaustMap(()=> this.genreService.getAllGenre().pipe(
                map((res:any)=> genreActions.getAllGenreSuccess({genres: res.genres})),
                catchError((err: any)=> of(genreActions.getAllGenreFailure({error: err})))
            ))
        )
    )

    createGenre = createEffect(()=>
        this.actions.pipe(
            ofType(genreActions.createGenre),
            exhaustMap(({name,description})=> this.genreService.createGenre(name,description).pipe(
                map((res: any)=> genreActions.createGenreSuccess({genres: res.genres})),
                catchError((err: any) => of(genreActions.createGenreFailure({error: err})))
            ))
        )
    )

    updateGenre = createEffect(()=> 
        this.actions.pipe(
            ofType(genreActions.updateGenre),
            exhaustMap(({name,description,id})=> this.genreService.updateGenre(name,description,id).pipe(
                map((res: any)=> genreActions.updateGenreSuccess({genres: res.genres})),
                catchError((err: any)=> of(genreActions.updateGenreFailure({error: err})))
            ))
        )
    )

    deleteGenre=createEffect(()=>
        this.actions.pipe(
            ofType(genreActions.deleteGenre),
            exhaustMap(({id})=> this.genreService.deleteGenre(id).pipe(
                map((res: any)=> genreActions.deleteGenreSuccess({genres: res.genres})),
                catchError((err: any)=> of(genreActions.deleteGenreFailure({error: err})))
            ))
        )
    )

    getGenreNames= createEffect(()=>
        this.actions.pipe(
            ofType(genreActions.getGenreNames),
            exhaustMap(()=> this.genreService.getGenreNames().pipe(
                map((res: any)=> genreActions.getGenreNamesSuccess({genres: res.genres})),
                catchError((err: any)=> of(genreActions.getGenreNamesFailure({error: err})))
            ))
        )
    )

    getAuthorNames= createEffect(()=>
        this.actions.pipe(
            ofType(genreActions.getAllAuthors),
            exhaustMap(()=> this.genreService.getAuthorNames().pipe(
                map((res: any)=> genreActions.getAllAuthorsSuccess({authors: res.authors})),
                catchError((error: any)=> of(genreActions.getAllAuthorsFailure({error: error})))
            ))
        )
    )
    
    constructor(private actions: Actions,private genreService: GenreService) {}
}