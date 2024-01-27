import { Component, Inject, Input } from '@angular/core';
import { Genre } from '../../models/Genre';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { title } from 'process';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { createGenre, deleteGenre, updateGenre } from '../../actions/genre';

@Component({
  selector: 'app-genre-dialog',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './genre-dialog.component.html',
  styleUrl: './genre-dialog.component.css'
})
export class GenreDialogComponent {
  genre !: Genre | null
  name!: string
  description !: string

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: {genre: Genre},private dialogRef: MatDialogRef<GenreDialogComponent>,private store: Store<AppState>) {
    this.genre = dialogData.genre
    if(dialogData.genre) {
      this.name = dialogData.genre.name
      this.description = dialogData.genre.description
    }
  }

  updateGenre() {
    if(this.genre)
      this.store.dispatch(updateGenre({name: this.name,description: this.description,id : this.genre?.id}))
    this.dialogRef.close()
  }

  createGenre() {
    this.store.dispatch(createGenre({name:this.name,description: this.description}))
    this.dialogRef.close()
  }

  deleteGenre() {
    if(this.genre)
      this.store.dispatch(deleteGenre({id: this.genre?.id}))
    this.dialogRef.close()
  }

}
