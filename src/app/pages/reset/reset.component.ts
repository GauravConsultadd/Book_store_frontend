import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { resetPassword } from '../../actions/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})
export class ResetComponent implements OnInit {
 password !:string
 uidb64 !: string
 token !: string

 ngOnInit(): void {
     this.uidb64 = this.route.snapshot.params['uidb64']
     this.token = this.route.snapshot.params['token']
 }
 
 onSubmit() {
  if(!this.password || this.password.length<8) {
    alert('Password should be atleast of 8 characters')
    return ;
  }
  this.store.dispatch(resetPassword({password: this.password,uidb64: this.uidb64,token: this.token}))
  this.router.navigate(['/login'])
 }

 constructor(private route: ActivatedRoute,private store: Store,private router: Router) {}

}
