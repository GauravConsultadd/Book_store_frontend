import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { Store, select } from '@ngrx/store';
import { getCurrentUser, initApp, loadUser } from './actions/user';
import { UserService } from './services/user';
import { Subscription } from 'rxjs';
import { AppState } from './reducers';
import { getAllBooks, getMyInventory } from './actions/books';
import { User } from './models/user';
import { getCart } from './actions/carts';
import {  NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RoutesRecognized, RouteConfigLoadStart, RouteConfigLoadEnd, ChildActivationStart, ChildActivationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HeaderComponent,RouterModule],
  providers:[UserService,Router],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'book_store';
  userSubscription !: Subscription
  isLoggedOut !: boolean

  constructor(private store: Store<AppState>,private router: Router) {
  }
  
  user: User | null = null
  
  ngOnInit() {
    this.userSubscription=this.store.select('user').subscribe((data)=> {
      this.user=data.user
      this.isLoggedOut = data.isLoggedOut
      
      if(data.loading===false && this.user===null && !data.isLoggedOut) {
        this.store.dispatch(getCurrentUser())
        this.store.dispatch(getCart())
        this.store.dispatch(getAllBooks())
      }
    })
  }

  ngOnDestroy(): void {
    if(this.userSubscription) this.userSubscription.unsubscribe()
  }
}