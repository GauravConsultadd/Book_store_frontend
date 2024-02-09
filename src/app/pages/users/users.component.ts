import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { UsercardComponent } from '../../components/usercard/usercard.component';
import { changeRole } from '../../actions/user';

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

  changeRole(id: number, event: any) {
    let role = event.target.value as string
    this.store.dispatch(changeRole({id,role}))
  }

  constructor(private store: Store<AppState>) {}
}
