import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { logginUser } from '../../actions/user';
import { UserService } from '../../services/user';
import { AppState } from '../../reducers';
import { userState } from '../../reducers/users';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterModule],
  providers:[UserService,Router],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy,OnInit {
  email!:string
  password!:string

  user !: User|null
  userSubscription !: Subscription

  constructor(private store: Store<AppState>,private router: Router) {}

  ngOnInit(): void {
      this.userSubscription=this.store.select('user').subscribe((data)=> {
        this.user=data.user
        if(data.isLoggedOut) {
          this.router.navigate(['/login'])
        }
        if(data.user) {
          this.router.navigate(['/'])
        }
      },

    )
  }

  ngOnDestroy(): void {
      if(this.userSubscription) {
        this.userSubscription.unsubscribe()
      }
  }

  forgotPassword() {
    this.router.navigate(['/forgot'])
  }
  
  onSubmit() {
    if(this.email.length===0 || this.password.length===0) {
      alert('Feilds should not be empty')
      return;
    }
    console.log(this.email,this.password)
    this.store.dispatch(logginUser({email: this.email,password: this.password}))
  }
}
