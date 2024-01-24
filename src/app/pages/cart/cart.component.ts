import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { CartItem } from '../../models/cartItem';
import { Subscription } from 'rxjs';
import { CartitemComponent } from '../../components/cartitem/cartitem.component';
import { CommonModule, NgFor } from '@angular/common';
import { Book } from '../../models/book';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CartitemComponent,CommonModule,NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit,OnDestroy {
  cart!: CartItem[]
  cartSubscription !: Subscription
  books !: Book[]
  bookSubscription !: Subscription

  ngOnInit(): void {
      this.cartSubscription = this.store.select('cart').subscribe((data)=> {
        this.cart = data.cart
      })

      this.bookSubscription = this.store.select('book').subscribe((data)=>{
        this.books = data.books
      })
  }

  ngOnDestroy(): void {
      if(this.cartSubscription) this.cartSubscription.unsubscribe()
      if(this.bookSubscription) this.bookSubscription.unsubscribe()
  }

  constructor(private store: Store<AppState>) {}
}
