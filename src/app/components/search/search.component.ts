import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { getAllBooks, searchBook } from '../../actions/books';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  query : {searchText: string,authors: string[],genres:[]}={
    searchText: '',
    authors: [],
    genres:[]
  }
  

  fetchResults() {
    this.store.dispatch(searchBook(this.query))
    console.log('dispatched')
  }

  clearFilter() {
    this.query.searchText=''
    this.store.dispatch(getAllBooks())
  }

  openFilterDialog() {
    const dialogRef = this.dialog.open(FilterDialogComponent,{
      width: '500px'
    })

    dialogRef.afterClosed().subscribe((result) => {
      this.query.authors = result.authors
      this.query.genres = result.genres
      this.store.dispatch(searchBook(this.query))
      console.log(result)
    })
  }

  constructor(private store: Store<AppState>,private dialog: MatDialog) {}
}
