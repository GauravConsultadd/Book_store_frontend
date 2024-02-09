import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { forgotPassword } from '../../actions/user';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css'
})
export class ForgotComponent {
  email !: string

  constructor(private store: Store) {}

  onSubmit() {
    this.store.dispatch(forgotPassword({email: this.email}))
  }
}
