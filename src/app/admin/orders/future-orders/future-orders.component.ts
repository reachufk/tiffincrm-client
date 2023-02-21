import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-future-orders',
  templateUrl: './future-orders.component.html',
  styleUrls: ['./future-orders.component.scss']
})
export class FutureOrdersComponent implements OnInit {

  FutureOrders:Array<any>=[];

  ngOnInit(): void {
    
  }
}
