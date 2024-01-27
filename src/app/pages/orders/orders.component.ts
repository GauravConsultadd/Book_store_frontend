import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminOrderModel, Order } from '../../models/order';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { getAllOrders } from '../../actions/orders';
import { CommonModule,DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit,OnDestroy {
  orders !: AdminOrderModel[]
  orderSubscription !: Subscription


  ngOnInit(): void {
    this.orderSubscription = this.store.select('admin').subscribe((data)=> {
      this.orders=data.orders

      if(!data.loading) {
        console.log("inside dispatch")
        this.store.dispatch(getAllOrders())
      }
    })
  }

  ngOnDestroy(): void {
    if(this.orderSubscription) this.orderSubscription.unsubscribe()
  }


  constructor(private store: Store<AppState>) {}
}
