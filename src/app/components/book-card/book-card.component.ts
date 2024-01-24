import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent {
  @Input() book!: Book
  image!:string


  onClick() {
    this.router.navigate(['/book-details'],{queryParams: {book: JSON.stringify(this.book)}})
  }
  constructor(private router: Router) {}
}
