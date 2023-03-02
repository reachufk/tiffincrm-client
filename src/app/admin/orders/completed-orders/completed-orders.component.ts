import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FetchOrderModel, initializeFetchOrderModel } from 'src/app/shared/interfaces/fetch-completed-orders';
import { AdminOrdersService } from '../../services/admin-orders.service';

@Component({
  selector: 'app-completed-orders',
  templateUrl: './completed-orders.component.html',
  styleUrls: ['./completed-orders.component.scss']
})
export class CompletedOrdersComponent {
  FilteredCompletedOrders: Array<any> = [];
  CompletedOrders: Array<any> = [];
  TotalPages: number = 1;
  TotalRecords: number = 1;
  FetchCompletedModel: FetchOrderModel = initializeFetchOrderModel();
  searchKeywordControl: FormControl = new FormControl("");
  OrderTypes: Array<any> = [{ name: "Lunch", value: "lunch" }, { name: "Dinner", value: "dinner" }]
  constructor(private orderService: AdminOrdersService) {

  }

  ngOnInit(): void {
    this.GetCompletedOrders()
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

  orderTypeFilter(event) {
    if(!event?.value?.length){
      this.FilteredCompletedOrders = this.CompletedOrders
      return
    }
    const selectedValues: Array<String> = event?.value;
    this.FilteredCompletedOrders = this.CompletedOrders.filter((order: any) => selectedValues?.includes(order?.orderType));
  }

}
