import { Component, Input } from '@angular/core';
import { Book } from '../../models/book';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { deleteBook, updateBook, } from '../../actions/books';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BookDialogComponent } from '../book-dialog/book-dialog.component';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-inventory-card',
  standalone: true,
  imports: [MatDialogModule,CommonModule],
  templateUrl: './inventory-card.component.html',
  styleUrl: './inventory-card.component.css'
})
export class InventoryCardComponent {
  @Input() book !: Book
  @Input() isAdmin !: boolean

  onDelete() {
    console.log("on delete")
    this.store.dispatch(deleteBook({id: this.book.id}))
  }

  openDialog(isUpdate: boolean): void {
    const dialogRef = this.dialog.open(BookDialogComponent, {
      width: '600px',
      data: {
        book: this.book,
        isUpdate
        // Add more props as needed
      },
    });

    // You can subscribe to events such as when the dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      this.store.dispatch(updateBook({book: result}))
    });
  }


  constructor(private store: Store<AppState>,private dialog: MatDialog) {}

}
