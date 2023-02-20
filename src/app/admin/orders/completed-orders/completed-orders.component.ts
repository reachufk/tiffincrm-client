import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FetchCompletedOrders, initializeFetchCompletedModel } from 'src/app/shared/interfaces/fetch-completed-orders';
import { AdmiOrdersService } from '../../services/admin-orders.service';

@Component({
  selector: 'app-completed-orders',
  templateUrl: './completed-orders.component.html',
  styleUrls: ['./completed-orders.component.scss']
})
export class CompletedOrdersComponent {
  CompletedOrders: Array<any> = [];
  TotalPages: number = 1;
  TotalRecords: number = 1;
  FetchCompletedModel: FetchCompletedOrders = initializeFetchCompletedModel();
  searchKeywordControl: FormControl = new FormControl("");
  OrderTypes: Array<any> = [{ name: "Lunch", value: "lunch" }, { name: "Dinner", value: "dinner" }]
  constructor(private orderService: AdmiOrdersService) {

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

}
