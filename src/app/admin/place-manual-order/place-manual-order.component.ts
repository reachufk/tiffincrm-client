import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-place-manual-order',
  templateUrl: './place-manual-order.component.html',
  styleUrls: ['./place-manual-order.component.scss']
})
export class PlaceManualOrderComponent implements OnInit {
  OrderSteps: MenuItem[] = [];
  constructor() {
    this.StepsInIt()
  }

  ngOnInit(): void {

  }


  StepsInIt() {
    this.OrderSteps = [
      { label: 'Customer Information',  routerLink: '/admin/place-order/customer-info' },
      { label: 'Catagories', routerLink: '/admin/place-order/catagory-selection', disabled: true },
      { label: 'Catagory Items',  routerLink: '/admin/place-order/items-selection', disabled: true },
      { label: 'Preview',  routerLink: '/admin/place-order/order-preview', disabled: true },
    ]
  }

  BackStep(){

  }
  NextStep(){

  }


}
