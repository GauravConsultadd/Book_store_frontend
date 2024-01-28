import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CheckoutOrder, createOrderModel } from '../../models/order';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { createOrder } from '../../actions/orders';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  order !: CheckoutOrder
  total_price !: number
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: {order: CheckoutOrder},private dialogRef: MatDialogRef<CheckoutComponent>,private store: Store<AppState>) {
    this.order = dialogData.order
    this.total_price = this.order.books.reduce((total, book) => total + book.price, 0);
    console.log(this.order,this.total_price)
  }

  placeOrder() {
    const placingOrder = {
      'user': this.order.user.id,
      'books': this.order.books.map((book) => book.id),
      'is_paid': true,
      'total_price': this.total_price
    }
    this.store.dispatch(createOrder({order: placingOrder}))
    this.dialogRef.close(true)
  }
}
