import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { Store, select } from '@ngrx/store';
import { getCurrentUser, initApp, loadUser } from './actions/user';
import { UserService } from './services/user';
import { userState } from './reducers/users';
import { Subscription } from 'rxjs';
import { AppState } from './reducers';
import { getAllBooks, getMyInventory } from './actions/books';
import { User } from './models/user';
import { getCart } from './actions/carts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HeaderComponent],
  providers:[UserService,Router],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'book_store';
  userSubscription !: Subscription
  constructor(private store: Store<AppState>,private router: Router) {}
  user !: User | null

  ngOnInit() {
    let access_token = localStorage.getItem('access_token')
    let refresh_token = localStorage.getItem('refresh_token')
    if(!access_token || !refresh_token) {this.router.navigate(['/login']);return;}

    this.userSubscription=this.store.select('user').subscribe((data)=> {
      this.user=data.user
      if(!data.loading && this.user==null) {
        this.store.dispatch(getCurrentUser())
        this.store.dispatch(getCart())
        this.store.dispatch(getAllBooks())
      }
    },(err)=> {
      alert(err)
    })
 }

 ngOnDestroy(): void {
     if(this.userSubscription) this.userSubscription.unsubscribe()
 }
}
