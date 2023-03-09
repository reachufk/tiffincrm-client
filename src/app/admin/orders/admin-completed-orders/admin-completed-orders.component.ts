import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FetchOrderModel, initializeFetchOrderModel } from 'src/app/shared/interfaces/fetch-completed-orders';
import { AdminOrdersService } from '../../services/admin-orders.service';

@Component({
  selector: 'app-admin-completed-orders',
  templateUrl: './admin-completed-orders.component.html',
  styleUrls: ['./admin-completed-orders.component.scss']
})
export class AdminCompletedOrdersComponent {


  AdminOrders: Array<any> = [];
  TotalPages: number = 1;
  TotalRecords: number = 1;
  FetchModel: FetchOrderModel = initializeFetchOrderModel();
  searchKeywordControl: FormControl = new FormControl("");
  OrderTypes: Array<any> = [{ name: "Lunch", value: "lunch" }, { name: "Dinner", value: "dinner" }]
  FilteredAdminOrders: Array<any> = [];
  constructor(private orderService: AdminOrdersService) {

  }

  ngOnInit(): void {
    this.GetAdminCompletedOrders()
  }

  GetAdminCompletedOrders() {
    this.orderService.GetAdminCompletedOrders(this.FetchModel).subscribe((res: any) => {
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

  pageChange(page: number) {
  this.FetchModel.pageNo = page;
  this.GetAdminCompletedOrders()
  }

}


