import { Component, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FetchOrderModel, initializeFetchOrderModel } from 'src/app/shared/interfaces/fetch-completed-orders';
import { AdmiOrdersService } from '../services/admin-orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  CompletedOrders: Array<any> = [];
  LatestOrders: Array<any> = [];
  TotalPages: number = 1;
  TotalRecords: number = 1;
  FetchCompletedModel: FetchOrderModel = initializeFetchOrderModel();
  searchKeywordControl: FormControl = new FormControl("");
  FilterdLatestOrders: Array<any> = [];
  constructor(private orderService: AdmiOrdersService) {

  }

  ngOnInit(): void {
    this.orderService.connect()
    this.orderService.FetchNewCreatedOrder().subscribe((res: any) => {
      console.log('update', res)
    })
  }

  GetCompletedOrders() {
    this.orderService.GetCompletedOrders(this.FetchCompletedModel).subscribe((res: any) => {
      if (res?.statusCode == 200) {
        this.CompletedOrders = res?.orders;
        this.TotalPages = res?.totalPages;
        this.TotalRecords = res?.totalCount
      }
    })
  }

  GetLatestOrders() {
    this.orderService.GetLatestOrders().subscribe((res: any) => {
      if (res?.statusCode == 200) {
        this.LatestOrders = res?.orders;
        this.FilterdLatestOrders = res?.orders
      }
    })
  }

  orderTypeFilter(event) {
    if(!event?.value?.length){
      this.FilterdLatestOrders = this.LatestOrders
      return
    }
    const selectedValues: Array<String> = event?.value;
    this.FilterdLatestOrders = this.LatestOrders.filter((order: any) => selectedValues?.includes(order?.orderType));
  }

  CreateOrder() {

  }






}
