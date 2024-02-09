import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { CartItem } from '../../models/cartItem';
import { Subscription } from 'rxjs';
import { CartitemComponent } from '../../components/cartitem/cartitem.component';
import { CommonModule, NgFor } from '@angular/common';
import { Book } from '../../models/book';
import { createOrder } from '../../actions/orders';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { removeAllCart } from '../../actions/carts';

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
  user !: User | null
  userSubscription !: Subscription
  totalPrice : number = 0

  ngOnInit(): void {
      this.cartSubscription = this.store.select('cart').subscribe((data)=> {
        this.cart = data.cart

        if(this.cart) {
          this.totalPrice=0
          for(let book of this.cart) {
            this.totalPrice += book.price
          }
        }
      })

      this.bookSubscription = this.store.select('book').subscribe((data)=>{
        this.books = data.books
      })

      this.userSubscription = this.store.select('user').subscribe((data)=> {
        this.user = data.user
      })
  }

  ngOnDestroy(): void {
      if(this.cartSubscription) this.cartSubscription.unsubscribe()
      if(this.bookSubscription) this.bookSubscription.unsubscribe()
      if(this.userSubscription) this.userSubscription.unsubscribe()
  }

  onBuy() {
    if(this.user) {
      let placingOrder={
        'user' : this.user?.id,
        'books': this.cart.map((book) => book.book),
        'is_paid': true,
        'total_price': this.totalPrice
      }

      console.log(placingOrder)
      this.store.dispatch(createOrder({order: placingOrder}))
      this.store.dispatch(removeAllCart())
      this.router.navigate(['/orders'])
    }
    else alert('something went wrong')
  }

  constructor(private store: Store<AppState>,private router: Router) {}
}
