import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { registerUser } from '../../actions/user';
import { UserService } from '../../services/user';
import { Observable } from 'rxjs';
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
export class RegisterComponent implements OnInit {
  username!:string
  password!:string
  email!:string
  selectedRole!:string
  
  user !: userState
  error!: string
  loading!:boolean

  constructor(private store: Store<AppState>,private router: Router) {}

  ngOnInit() {
    this.store.select('user').subscribe((data)=> {
      this.user=data

      if(this.user && this.user.user) {
        this.router.navigate(['/login'])
      }
    },(err)=> alert(err))
    
  }
  onSubmit() {
    this.store.dispatch(registerUser({username: this.username,email: this.email,password: this.password,role: this.selectedRole}))
  }



}
