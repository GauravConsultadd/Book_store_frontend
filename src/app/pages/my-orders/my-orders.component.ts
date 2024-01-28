import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from '../../models/order';
import { Subscription } from 'rxjs';
import { getMyOrders } from '../../actions/orders';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { CommonModule, NgFor, DatePipe } from '@angular/common';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule,NgFor],
  providers:[OrderService],
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

  generateInvoice (id: number) {
    this.orderService.generateInvoice(id).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/pdf' });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'invoice.pdf'; 
      link.click();

      window.URL.revokeObjectURL(link.href);
    });
  }

  ngOnDestroy(): void {
      if(this.orderSubscription) this.orderSubscription.unsubscribe()
  }

  constructor(private store: Store<AppState>,private orderService: OrderService) {}
}
