import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { Router, RouterModule } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule,MenuComponent,RouterModule,SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit,OnDestroy {
  userSubscription !: Subscription
  constructor(private store: Store<AppState>,private router: Router) {}
  user: User | null = null

  ngOnInit(): void {
    this.userSubscription=this.store.select('user').subscribe((data)=> {
      this.user=data.user

    },(err)=> alert(err))
  }

  ngOnDestroy(): void {
    if(this.userSubscription) this.userSubscription.unsubscribe()
  }

}
