import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FilterService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { FetchOrderModel, initializeFetchOrderModel } from 'src/app/shared/interfaces/fetch-completed-orders';
import { AdminOrdersService } from '../../services/admin-orders.service';
import { OrderInvoiceComponent } from '../order-invoice/order-invoice.component';

@Component({
  selector: 'app-completed-orders',
  templateUrl: './completed-orders.component.html',
  styleUrls: ['./completed-orders.component.scss'],
  providers: [DialogService, FilterService]
})
export class CompletedOrdersComponent {
  FilteredCompletedOrders: Array<any> = [];
  CompletedOrders: Array<any> = [];
  TotalPages: number = 1;
  TotalRecords: number = 1;
  FetchCompletedModel: FetchOrderModel = initializeFetchOrderModel();
  searchKeywordControl: FormControl = new FormControl("");
  OrderTypes: Array<any> = [{ name: "Lunch", value: "lunch" }, { name: "Dinner", value: "dinner" }];
  constructor(private orderService: AdminOrdersService, private dialogService: DialogService,
    private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.GetCompletedOrders()
  }

  GetCompletedOrders() {
    this.orderService.GetCompletedOrders(this.FetchCompletedModel).subscribe((res: any) => {
      if (res?.statusCode == 200) {
        this.CompletedOrders = res?.orders;
        this.FilteredCompletedOrders = res?.orders;
        this.TotalPages = res?.totalPages;
        this.TotalRecords = res?.totalCount
      }
    })
  }

  orderTypeFilter(event) {
    if (!event?.value?.length) {
      this.FilteredCompletedOrders = this.CompletedOrders
      return
    }
    const selectedValues: Array<String> = event?.value;
    this.FilteredCompletedOrders = this.CompletedOrders.filter((order: any) => selectedValues?.includes(order?.orderType));
  }

  ViewOrder(order: any) {
    const orderData = { ...order, isCompleted: true }
    const ref = this.dialogService.open(OrderInvoiceComponent, {
      header: order?.userInfo?.username + ' ' + 'Order',
      width: '60%',
      data: orderData
    });
    ref.onClose.subscribe((result: any) => {
      if (result) {
        this.messageService.add({ severity: 'success', summary: 'Order processed to complete' });
        this.CompletedOrders = this.CompletedOrders.filter((orders: any) => orders?._id !== order?._id);
        this.FilteredCompletedOrders = this.CompletedOrders
      }
    })
  }

}
