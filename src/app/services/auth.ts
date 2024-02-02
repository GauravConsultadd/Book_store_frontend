import { Injectable } from '@angular/core';
import { Role } from '../role';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private store: Store<AppState>) { }

  getUserRole(): Role {
    
    const access_token = localStorage.getItem('access_token')
    const refresh_token = localStorage.getItem('refresh_token')
    const l_user = localStorage.getItem('user')
    const user = JSON.parse(l_user as string)
    
    if(!access_token || !refresh_token || !user) return Role.Unauthorized
    const role = user.role as Role
    return role;
  }
}