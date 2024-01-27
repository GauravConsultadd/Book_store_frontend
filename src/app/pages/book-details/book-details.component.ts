import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { addToCart, removeFromCart } from '../../actions/carts';
import { CartItem } from '../../models/cartItem';
import { CommonModule, NgFor } from '@angular/common';
import { createOrder } from '../../actions/orders';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule,NgFor],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit,OnDestroy {
    constructor(private route: ActivatedRoute,private store: Store<AppState>,private router: Router) {}

    book!:Book
    user!: User | null
    userSubscription!: Subscription

    cartSubscription !: Subscription
    cart!: CartItem[]

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
          const bookParam = params['book']
          if(bookParam) {
            const book = JSON.parse(bookParam)
            this.book=book
            console.log(book)
          }
        })

        this.userSubscription = this.store.select('user').subscribe((data)=> {
          this.user = data.user
        },(err)=> alert(err))

        this.cartSubscription = this.store.select('cart').subscribe((data)=> {
          this.cart = data.cart
        })
    }

    ngOnDestroy(): void {
        if(this.userSubscription) {
          this.userSubscription.unsubscribe()
        }
        if(this.cartSubscription) {
          this.cartSubscription.unsubscribe()
        }
    }

    isInCart(): boolean {
      if(this.cart && this.book)
        return this.cart.some(cartItem => cartItem.book === this.book.id)
      return false
    }
    addToCart() {
      if(this.user)
        this.store.dispatch(addToCart({userId: this.user?.id,bookId: this.book?.id,price: this.book.price,quantity: 1}))
    }

    buyNow() {
      if(this.user)  {
        const order = {
          'user': this.user?.id,
          'books': [this.book.id],
          'is_paid': true,
          'total_price': this.book.price
        }
        
        this.store.dispatch(createOrder({order: order}))

        this.router.navigate(['/orders'])
      }
    }

    // removeFromCart() {
    //   this.store.dispatch(removeFromCart({user: this.user?.id,book: this.book.id}))
    // }

}
