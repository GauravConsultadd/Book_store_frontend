import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from '../../models/order';
import { Subscription } from 'rxjs';
import { getMyOrders } from '../../actions/orders';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { CommonModule, NgFor, DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule,NgFor],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})

export class MyOrdersComponent implements OnInit,OnDestroy {
  orders !: Order[]
  orderSubscription !: Subscription
  

  ngOnInit(): void {
      this.orderSubscription = this.store.select('order').subscribe((data)=> {
        this.orders=data.orders

        if(!data.loading) {
          console.log("inside dispatch")
          this.store.dispatch(getMyOrders())
        }
      })
  }

  ngOnDestroy(): void {
      if(this.orderSubscription) this.orderSubscription.unsubscribe()
  }

  constructor(private store: Store<AppState>) {}
}
