import { Component, Input, OnInit, Pipe, PipeTransform  } from '@angular/core';
import { Book } from '../../models/book';
import { Router, RouterModule } from '@angular/router';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, maxLength: number): string {
    if (value.length > maxLength) {
      return value.substring(0, maxLength) + '...';
    }
    return value;
  }
}

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})
export class BookCardComponent  {
  @Input() book!: Book
  onClick() {
    this.router.navigate(['/book-details'],{queryParams: {book: JSON.stringify(this.book)}})
  }
  constructor(private router: Router) {}
}
