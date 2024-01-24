import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../../reducers';
import { Store } from '@ngrx/store';
import { getAllBooks } from '../../actions/books';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { BookCardComponent } from '../../components/book-card/book-card.component';

@Component({
  selector: 'app-booklist',
  standalone: true,
  imports: [CommonModule,NgFor,BookCardComponent],
  templateUrl: './booklist.component.html',
  styleUrl: './booklist.component.css'
})
export class BooklistComponent implements OnInit, OnDestroy {
  books=[]
  bookSubscription !: Subscription

  ngOnInit(): void {
      this.store.dispatch(getAllBooks())
      this.bookSubscription = this.store.select('book').subscribe((data:any)=> {this.books=data.books},(err) => alert(err))
  }

  ngOnDestroy(): void {
      if(this.bookSubscription) this.bookSubscription.unsubscribe()
  }

  constructor(private store: Store<AppState>,private router: Router) {}
}
