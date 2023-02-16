import { Component, inject, OnInit } from '@angular/core';
import { AdmiOrdersService } from '../services/admin-orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  private orderService = inject(AdmiOrdersService);
  Users
  ngOnInit(): void {
    this.GetOrders()
  }

  GetOrders(){
  }


}
