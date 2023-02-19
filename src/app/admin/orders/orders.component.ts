import { Component, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FetchCompletedOrders, initializeFetchCompletedModel } from 'src/app/shared/interfaces/fetch-completed-orders';
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
  FetchCompletedModel:FetchCompletedOrders = initializeFetchCompletedModel();
  searchKeywordControl:FormControl = new FormControl("")
  constructor(private orderService: AdmiOrdersService) {

  }

  ngOnInit(): void {
    this.orderService.connect()
    this.GetLatestOrders()
    this.orderService.FetchNewCreatedOrder().subscribe((res:any)=>{
      console.log('update',res)
    })
  }

  GetCompletedOrders() {
    this.orderService.GetCompletedOrders(this.FetchCompletedModel).subscribe((res: any) => {
      if(res?.statusCode ==200){
        this.CompletedOrders = res?.orders;
        this.TotalPages = res?.totalPages;
        this.TotalRecords = res?.totalCount
      }
    })
  }

  GetLatestOrders(){
    this.orderService.GetLatestOrders().subscribe((res: any) => {
      if(res?.statusCode ==200){
        this.LatestOrders = res?.orders;
      }
    })
  }

  CreateOrder() {

  }






}
