import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { UsercardComponent } from '../../components/usercard/usercard.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule,NgFor,UsercardComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  userSubscription !: Subscription
  users !: User[]

  ngOnInit(): void {
      this.userSubscription = this.store.select('admin').subscribe((data)=>
        this.users = data.users
      )
  }

  constructor(private store: Store<AppState>) {}
}
