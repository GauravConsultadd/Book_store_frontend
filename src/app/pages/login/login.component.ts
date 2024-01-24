import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { logginUser } from '../../actions/user';
import { UserService } from '../../services/user';
import { AppState } from '../../reducers';
import { userState } from '../../reducers/users';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  providers:[UserService,Router],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy,OnInit {
  email!:string
  password!:string

  user !: userState
  userSubscription !: Subscription



  constructor(private store: Store<AppState>,private router: Router) {}

  ngOnInit(): void {
      this.userSubscription=this.store.select('user').subscribe((data)=> {
        this.user=data
        // console.log("here")
        if(this.user?.user) {
          console.log("here")
          this.router.navigate(['/']);
        }
      },
      (err)=> alert(err)
    )
  }

  ngOnDestroy(): void {
      if(this.userSubscription) {
        this.userSubscription.unsubscribe()
      }
  }

  
  onSubmit() {
    console.log(this.email,this.password)
    this.store.dispatch(logginUser({email: this.email,password: this.password}))
  }
}
