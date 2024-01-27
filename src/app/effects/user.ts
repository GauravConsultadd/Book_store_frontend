import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { EmptyError, catchError, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { UserService } from "../services/user";
import * as userAction from '../actions/user'
import { User } from "../models/user";
import { Router } from "@angular/router";

@Injectable()
export class UserEffects {
  userRegister$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userAction.registerUser),
      exhaustMap(({username,email,password,role})=> this.userService.register(username,email,password,role).pipe(
        map((user:User)=> userAction.registerUserSuccess({user})),
        catchError((err)=> of(userAction.registerUserFailure(err.message)))
      ))
    )
  );

  loginUser$ = createEffect(()=>
    this.actions$.pipe(
      ofType(userAction.logginUser),
      exhaustMap(({email,password})=> this.userService.login(email,password).pipe(
        tap((response: any)=> {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);
        }),
        map((response:any)=> userAction.logginUserSuccess({user: response.user})),
        catchError((err)=> of(userAction.logginUserFailure(err.message)))
      ))
    )
  )

  loadUser$ = createEffect(()=> 
    this.actions$.pipe(
      ofType(userAction.loadUser),
      exhaustMap(({token})=> this.userService.loadUser(token).pipe(
        map((res: any) => userAction.loadUserSuccess({access_token: res.access_token, refresh_token: res.refresh_token})),
        catchError((err)=> {
          return of(userAction.logginUserFailure(err))
        })
      ))
    )
  )

  getUser = createEffect(()=> 
      this.actions$.pipe(
        ofType(userAction.getCurrentUser),
        exhaustMap(()=> this.userService.getUser().pipe(
          map((res: any) => userAction.getCurrentUserSuccess({user: res.user})),
          catchError((err)=> {
            this.router.navigate(['/login'])
            return of(userAction.logginUserFailure(err.message))
          })
        ))
      )
  )

  logoutUser = createEffect(()=> 
      this.actions$.pipe(
        ofType(userAction.logoutUser),
        exhaustMap(()=> this.userService.logoutUser().pipe(
          map((res: any) => {
            return userAction.logoutUserSuccess()
          }),
          catchError((err)=> {
            return of(userAction.logoutUserFailure(err))
          })
        ))
      )
  )

  getAllUser = createEffect(()=> 
      this.actions$.pipe(
        ofType(userAction.getAllUser),
        exhaustMap(() => this.userService.getAllUser().pipe(
          map((res:any)=> userAction.getAllUserSuccess({users: res.users})),
          catchError((err)=> of(userAction.getAllUserFailure({error: err})))
        ))
      )
  )

  constructor(private actions$: Actions, private userService: UserService,private router: Router) {}
}