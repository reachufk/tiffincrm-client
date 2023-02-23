import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FetchOrderModel, initializeFetchOrderModel } from 'src/app/shared/interfaces/fetch-completed-orders';
import { AdmiOrdersService } from '../../services/admin-orders.service';

@Component({
  selector: 'app-admin-created-orders',
  templateUrl: './admin-created-orders.component.html',
  styleUrls: ['./admin-created-orders.component.scss']
})
export class AdminCreatedOrdersComponent implements OnInit {
  AdminOrders: Array<any> = [];
  TotalPages: number = 1;
  TotalRecords: number = 1;
  FetchCompletedModel: FetchOrderModel = initializeFetchOrderModel();
  searchKeywordControl: FormControl = new FormControl("");
  OrderTypes: Array<any> = [{ name: "Lunch", value: "lunch" }, { name: "Dinner", value: "dinner" }]
  FilteredAdminOrders: Array<any> = [];
  constructor(private orderService: AdmiOrdersService) {

  }

  ngOnInit(): void {
    this.GetAdminOrders()
  }

  GetAdminOrders() {
    this.orderService.GetAdminCreatedOrders(this.FetchCompletedModel).subscribe((res: any) => {
      if (res?.statusCode == 200) {
        this.AdminOrders = res?.orders;
        this.FilteredAdminOrders = res?.orders
        this.TotalPages = res?.totalPages;
        this.TotalRecords = res?.totalCount
      }
    })
  }

  orderTypeFilter(event) {
    if(!event?.value?.length){
      this.FilteredAdminOrders = this.AdminOrders
      return
    }
    const selectedValues: Array<String> = event?.value;
    this.FilteredAdminOrders = this.AdminOrders.filter((order: any) => selectedValues?.includes(order?.orderType));
  }

}
