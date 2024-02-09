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
        catchError((err)=> {console.log(err.error.message,"inside effect");return of(userAction.registerUserFailure({error: err.error.message}))})
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
          localStorage.setItem('user',JSON.stringify(response.user))
        }),
        map((response:any)=> {return userAction.logginUserSuccess({user: response.user})}),
        catchError((err)=> of(userAction.logginUserFailure({error: err.error.message[0]})))
      ))
    )
  )

  loadUser$ = createEffect(()=> 
    this.actions$.pipe(
      ofType(userAction.loadUser),
      exhaustMap(({token})=> this.userService.loadUser(token).pipe(
        map((res: any) => userAction.loadUserSuccess({access_token: res.access_token, refresh_token: res.refresh_token})),
        catchError((err)=> {
          return of(userAction.logginUserFailure({error:err}))
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
            return of(userAction.getCurrentUserFailure({error:err.message}))
          })
        ))
      )
  )

  logoutUser = createEffect(()=> 
      this.actions$.pipe(
        ofType(userAction.logoutUser),
        exhaustMap(()=> this.userService.logoutUser().pipe(
          map((res: any) => {
            this.router.navigate(['login'])
            return userAction.logoutUserSuccess()
          }),
          catchError((err)=> {
            return of(userAction.logoutUserFailure({error:err}))
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

  changeRole = createEffect(()=>
      this.actions$.pipe(
        ofType(userAction.changeRole),
        exhaustMap(({id,role})=> this.userService.changeUserRole(id,role).pipe(
          map((res: any)=> userAction.changeRoleSuccess({users: res.users})),
          catchError((err) => of(userAction.changeRoleFailure({error: err})))
        ))
      )
  )

  forgotPassword = createEffect(()=> 
      this.actions$.pipe(
        ofType(userAction.forgotPassword),
        exhaustMap(({email}) => this.userService.forgotPassword(email).pipe(
          map((res: any) => {
            return userAction.forgotPasswordSuccess()
          }),
          catchError((err) => {alert('something went wrong');return of(userAction.forgotPasswordFailure({error: err.message}))})
        ))
      )
  )

  resetPassword = createEffect(()=> 
      this.actions$.pipe(
        ofType(userAction.resetPassword),
        exhaustMap(({password,uidb64,token})=> this.userService.resetPassword(password,uidb64,token).pipe(
          map((res: any)=> userAction.resetPasswordSuccess),
          catchError((err) => {alert('something went wrong');return of(userAction.forgotPasswordFailure({error: err.message}))})
        ))
      )
  )

  constructor(private actions$: Actions, private userService: UserService,private router: Router) {}
}