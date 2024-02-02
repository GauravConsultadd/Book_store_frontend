import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { logoutUser, logoutUserSuccess } from '../../actions/user';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent {
  login() {
    console.log("logout")
    localStorage.clear()
    this.store.dispatch(logoutUserSuccess())
    this.router.navigate(['/login'])
  }
  constructor(private router: Router,private store: Store<AppState>) {}
}
