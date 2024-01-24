import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { getMyInventory } from '../../actions/books';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent implements OnInit,OnDestroy {
  inventory !: Book[]
  inventorySubscription !: Subscription

  ngOnInit(): void {
      this.inventorySubscription = this.store.select('inventory').subscribe((data) => {
        this.inventory = data.books
        if(!data.loading) {
          this.store.dispatch(getMyInventory())
        }
      },(error)=> {
        console.log(error)
      })
  }

  ngOnDestroy(): void {
      if(this.inventorySubscription) this.inventorySubscription.unsubscribe()
  }

  constructor(private store: Store<AppState>) {}
}
