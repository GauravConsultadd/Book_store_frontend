import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { Book } from '../../models/book';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { removeFromCart } from '../../actions/carts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartitem',
  standalone: true,
  imports: [],
  templateUrl: './cartitem.component.html',
  styleUrl: './cartitem.component.css'
})
export class CartitemComponent implements OnInit {
  @Input() cartItem !: CartItem
  @Input() books !: Book[]
  book !: Book | undefined

  ngOnInit(): void {
    this.book = this.books.find(book => book.id === this.cartItem.book)
  }

  onClick() {
    this.router.navigate(['/book-details'],{queryParams: {book: JSON.stringify(this.book)}})
  }
  removeFromCart() {
    this.store.dispatch(removeFromCart({id: this.cartItem.id}))
  }

  constructor(private store: Store<AppState>,private router: Router) {}
}
