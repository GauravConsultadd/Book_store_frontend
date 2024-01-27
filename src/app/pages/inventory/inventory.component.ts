import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { createBook, getMyInventory } from '../../actions/books';
import { CommonModule, NgFor } from '@angular/common';
import { InventoryCardComponent } from '../../components/inventory-card/inventory-card.component';
import { MatDialog } from '@angular/material/dialog';
import { BookDialogComponent } from '../../components/book-dialog/book-dialog.component';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule,NgFor,InventoryCardComponent],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit,OnDestroy {
  inventory !: Book[]
  inventorySubscription !: Subscription

  ngOnInit(): void {
      this.inventorySubscription = this.store.select('inventory').subscribe((data) => {
        this.inventory = data.books
        if(!data.loading) {
          this.store.dispatch(getMyInventory())
        }
      },(error)=> {
        console.log(error)
      })
  }


  ngOnDestroy(): void {
      if(this.inventorySubscription) this.inventorySubscription.unsubscribe()
  }

  openDialog() {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      width: '600px',
      data: {
        book: null,
        isUpdate: false
        // Add more props as needed
      },
    });

    // You can subscribe to events such as when the dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      console.log("in component",result)
      this.store.dispatch(createBook({book: result}))
    });
  }

  constructor(private store: Store<AppState>,private dialog: MatDialog) {}
}
