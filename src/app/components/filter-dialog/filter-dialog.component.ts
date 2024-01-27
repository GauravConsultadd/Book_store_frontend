import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { getAllAuthors, getGenreNames } from '../../actions/genre';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-dialog',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './filter-dialog.component.html',
  styleUrl: './filter-dialog.component.css'
})
export class FilterDialogComponent implements OnInit,OnDestroy {
  genreSubscription !: Subscription
  authors: { name: string, isSelected: boolean} [] = []
  genres: {name: string,isSelected: boolean}[] = []
  selectedFilters: { authors: string[], genres: string[] } = { authors: [], genres: [] };

  applyFilters(): void {
    this.selectedFilters.authors = this.authors.filter(author => author.isSelected).map(author => author.name);
    this.selectedFilters.genres = this.genres.filter(genre => genre.isSelected).map(genre => genre.name);
    this.dialogRef.close(this.selectedFilters);
  }


  ngOnInit(): void {
      this.store.dispatch(getAllAuthors())
      this.store.dispatch(getGenreNames())

      this.genreSubscription = this.store.select('search').subscribe((data)=> {

        if (this.authors.length===0) {
          for(let i=0;i<data.authors.length;i++) {
            this.authors.push({name: data.authors[i],isSelected: false})
          }
        }

        if(this.genres.length===0)
          for(let i=0;i<data.genres.length;i++) {
            this.genres.push({name: data.genres[i],isSelected: false})
          }
      })
  }

  ngOnDestroy(): void {
      if(this.genreSubscription) this.genreSubscription.unsubscribe()
  }

  constructor(private store: Store<AppState>,public dialogRef: MatDialogRef<FilterDialogComponent>) {}
}
