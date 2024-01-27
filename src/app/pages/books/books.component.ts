import { Component } from '@angular/core';
import { BookDialogComponent } from '../../components/book-dialog/book-dialog.component';
import { Book } from '../../models/book';
import { Subscription } from 'rxjs';
import { getMyInventory } from '../../actions/books';
import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { CommonModule, NgFor } from '@angular/common';
import { InventoryCardComponent } from '../../components/inventory-card/inventory-card.component';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule,NgFor,InventoryCardComponent],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  inventory !: Book[]
  inventorySubscription !: Subscription

  ngOnInit(): void {
      this.inventorySubscription = this.store.select('book').subscribe((data)=>
        this.inventory=data.books
      )
  }


  ngOnDestroy(): void {
      if(this.inventorySubscription) this.inventorySubscription.unsubscribe()
  }

  constructor(private store: Store<AppState>) {}

}
