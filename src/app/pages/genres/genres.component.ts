import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Genre } from '../../models/Genre';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { getAllGenre } from '../../actions/genre';
import { CommonModule, NgFor } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { GenreDialogComponent } from '../../components/genre-dialog/genre-dialog.component';

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [CommonModule,NgFor],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.css'
})
export class GenresComponent implements OnInit,OnDestroy {
  genreSubscription !: Subscription
  genres !: Genre[]
  isCreate !: boolean

  ngOnInit(): void {
      this.genreSubscription = this.store.select('genre').subscribe((data)=> {
        this.genres = data.genres

        if(!data.loading) {
          this.store.dispatch(getAllGenre())
        }
      })
  }

  openDialog(genre: Genre | null,isCreate: boolean) {
    const dialogRef = this.dialog.open(GenreDialogComponent, {
      width: '600px',
      data: {
        genre: genre,
        // Add more props as needed
      },
    });

    // You can subscribe to events such as when the dialog is closed
    dialogRef.afterClosed().subscribe(result => {
      console.log()
      this.ngOnInit()
    });
  }

  ngOnDestroy(): void {
      if(this.genreSubscription) this.genreSubscription.unsubscribe()
  }

  constructor(private store: Store<AppState>,private dialog: MatDialog) {}
}
