import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { FetchOrderModel, initializeFetchOrderModel } from 'src/app/shared/interfaces/fetch-completed-orders';
import { AdminOrdersService } from '../../services/admin-orders.service';
import { OrderInvoiceComponent } from '../order-invoice/order-invoice.component';

@Component({
  selector: 'app-admin-created-orders',
  templateUrl: './admin-created-orders.component.html',
  styleUrls: ['./admin-created-orders.component.scss'],
  providers: [DialogService]
})
export class AdminCreatedOrdersComponent implements OnInit {
  selected: any = 'admin-latest'
  AdminOrders: Array<any> = [];
  TotalPages: number = 1;
  TotalRecords: number = 1;
  FetchModel: FetchOrderModel = initializeFetchOrderModel();
  searchKeywordControl: FormControl = new FormControl("");
  OrderTypes: Array<any> = [{ name: "Lunch", value: "lunch" }, { name: "Dinner", value: "dinner" }]
  FilteredAdminOrders: Array<any> = [];
  constructor(private orderService: AdminOrdersService, private dialogService: DialogService,
    private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.FetchAdminLatestOrders()
  }

  // GetAdminOrders() {
  //   this.orderService.GetAdminCreatedOrders(this.FetchModel).subscribe((res: any) => {
  //     if (res?.statusCode == 200) {
  //       this.AdminOrders = res?.orders;
  //       this.FilteredAdminOrders = res?.orders
  //       this.TotalPages = res?.totalPages;
  //       this.TotalRecords = res?.totalCount
  //     }
  //   })
  // }

  orderTypeFilter(event) {
    if (!event?.value?.length) {
      this.FilteredAdminOrders = this.AdminOrders
      return
    }
    const selectedValues: Array<String> = event?.value;
    this.FilteredAdminOrders = this.AdminOrders.filter((order: any) => selectedValues?.includes(order?.orderType));
  }

  pageChange(page: number) {
    this.FetchModel.pageNo = page;
    if(this.selected == 'admin-latest'){
      this.FetchAdminLatestOrders();
      return
    }
    this.FetchAdminFutureOrders()
  }

  ViewOrder(order: any) {
    const orderData = { ...order, ref: 'admin-created' }
    const ref = this.dialogService.open(OrderInvoiceComponent, {
      header: order?.username + ' ' + 'Order',
      width: '60%',
      data: orderData
    });
    ref.onClose.subscribe((result: any) => {
      if (result) {
        this.messageService.add({ severity: 'success', summary: 'Order processed to complete' });
        this.AdminOrders = this.AdminOrders.filter((orders: any) => orders?._id !== order?._id);
        this.FilteredAdminOrders = this.AdminOrders
      }
    })
  }

  FetchAdminLatestOrders() {
    this.orderService.FetchAdminLatestOrders(this.FetchModel).subscribe((res: any) => {
      if (res?.statusCode == 200) {
        this.AdminOrders = res?.data;
        this.FilteredAdminOrders = res?.data
        this.TotalPages = res?.totalPages;
        this.TotalRecords = res?.totalCount
      }
    })
  }

  FetchAdminFutureOrders() {
    this.orderService.FetchAdminFutureOrders(this.FetchModel).subscribe((res: any) => {
      if (res?.statusCode == 200) {
        this.AdminOrders = res?.data;
        this.FilteredAdminOrders = res?.data
        this.TotalPages = res?.totalPages;
        this.TotalRecords = res?.totalCount
      }
    })
  }

  handleTabChange({ index }) {
    if (index == 1) {
      this.selected = 'admin-future'
      this.FetchAdminFutureOrders();
      return
    }
    this.selected = 'admin-latest'
    this.FetchAdminLatestOrders();
  }

}
