import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from '../filter-dialog/filter-dialog.component';
import { getAllBooks, searchBook } from '../../actions/books';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  query : {searchText: string,authors: string[],genres:[]}={
    searchText: '',
    authors: [],
    genres:[]
  }
  
  private searchStream = new Subject<string>()

  ngOnInit(): void {
    this.searchStream.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((text: string) => {
      this.store.dispatch(searchBook(this.query))
    })
  }

  onChange() {
    console.log("some")
    this.searchStream.next(this.query.searchText)
  }

  fetchResults() {
    this.store.dispatch(searchBook(this.query))
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
