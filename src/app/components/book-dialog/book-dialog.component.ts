import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Genre } from '../../models/Genre';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { Subscription } from 'rxjs';
import { getAllGenre } from '../../actions/genre';

@Component({
  selector: 'app-book-dialog',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './book-dialog.component.html',
  styleUrl: './book-dialog.component.css'
})
export class BookDialogComponent implements OnInit,OnDestroy {
  isUpdate !: boolean

  id !:number
  title !: string
  description !: string
  cover_image_url !: string
  genre !: string
  author !: string
  price !: number

  genreSubscription !: Subscription
  genres !: Genre[]

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: {book: Book,isUpdate: boolean},private dialogRef: MatDialogRef<BookDialogComponent>,private store: Store<AppState>) {
    if(dialogData.book) {
      this.id = dialogData.book.id
      this.title = dialogData.book.title
      this.description = dialogData.book.description
      this.cover_image_url = dialogData.book.cover_image_url
      this.genre = dialogData.book.genre
      this.author = dialogData.book.author
      this.price = dialogData.book.price
    }
    this.isUpdate = dialogData.isUpdate
  }

  ngOnInit(): void {
      this.genreSubscription = this.store.select('genre').subscribe((data)=> {
        this.genres = data.genres

        if(!data.loading) {
          this.store.dispatch(getAllGenre())
        }
      })
  }

  ngOnDestroy(): void {
      if(this.genreSubscription) this.genreSubscription.unsubscribe()
  }

  onSubmit() {
    if(!this.title || this.title.length<3) alert('title should have atleast 3 letters')
    if(!this.description || this.description.length<3) alert('description should have atleast 3 characters')
    if(!this.cover_image_url || this.cover_image_url==='') alert('cover_image_url is required')
    if(!this.genre || this.genre==='') alert('genre is required')
    if(!this.author || this.author.length<3) alert('author should have 3 atleast letters')
    if(!this.price || this.price===0) alert('price is invalid')

    
    this.dialogRef.close({
      'id': this.id,
      'title': this.title,
      'description': this.description,
      'cover_image_url': this.cover_image_url,
      'genre': this.genre,
      'author': this.author,
      'price': this.price
    })
  }
}
