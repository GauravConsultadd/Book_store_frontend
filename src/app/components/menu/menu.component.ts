import { Component, OnDestroy, OnInit } from '@angular/core';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { logoutUser } from '../../actions/user';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule,RouterModule,CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit,OnDestroy {

  user !: User | null
  userSubscription !: Subscription

  ngOnInit(): void {
      this.userSubscription = this.store.select('user').subscribe((data)=> {
        this.user = data.user
      },(err) => console.log(err))
  }

  ngOnDestroy(): void {
      if(this.userSubscription) this.userSubscription.unsubscribe()
  }

  logout() {
    this.store.dispatch(logoutUser())
  }

  constructor(private store: Store<AppState>,private router: Router) {}
}
