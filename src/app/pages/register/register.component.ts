import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { registerUser } from '../../actions/user';
import { UserService } from '../../services/user';
import { Observable, Subscription } from 'rxjs';
import { User } from '../../models/user';
import { userState } from '../../reducers/users';
import { AppState } from '../../reducers';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,RouterModule],
  providers:[UserService,Router],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy {
  username!:string
  password!:string
  email!:string
  selectedRole!:string
  
  user !: userState
  error!: string
  loading!:boolean

  userSubscription !: Subscription
  constructor(private store: Store<AppState>,private router: Router) {}



  onSubmit() {
    this.error=''
    console.log("inside submit")
    if (this.username.length < 3) {
      alert('Username should have at least 3 characters');
      return;
    }
    if (!this.email || this.email.length === 0) {
      alert('Email should not be empty');
      return;
    }
    if (this.password.length < 8) {
      alert('Password should have at least 8 characters');
      return;
    }
  
    if (!this.selectedRole || this.selectedRole === '') {
      alert('Please select a role');
      return;
    }
  
    if (this.error) {
      alert(this.error);
      return;
    }
  
    // Dispatch the action to register the user
    this.store.dispatch(registerUser({username: this.username, email: this.email, password: this.password, role: this.selectedRole}));
  
    // Check for errors after the registration action
    this.userSubscription = this.store.select('user').subscribe((data) => {
      this.user = data;
  
      if (data.error && data) {
        alert(data.error);
      }
  
      if (!data.error && data.isLoggedOut) {
        console.log(data.error)
        console.log('routing from here')
        this.router.navigate(['/login']);
      }
    }, (err) => alert(err));
  }
  

  ngOnDestroy(): void {
      if(this.userSubscription) this.userSubscription.unsubscribe()
  }



}
