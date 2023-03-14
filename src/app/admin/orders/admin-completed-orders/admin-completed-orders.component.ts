import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { FetchOrderModel, initializeFetchOrderModel } from 'src/app/shared/interfaces/fetch-completed-orders';
import { AdminOrdersService } from '../../services/admin-orders.service';
import { OrderInvoiceComponent } from '../order-invoice/order-invoice.component';

@Component({
  selector: 'app-admin-completed-orders',
  templateUrl: './admin-completed-orders.component.html',
  styleUrls: ['./admin-completed-orders.component.scss'],
  providers:[DialogService]
})
export class AdminCompletedOrdersComponent {


  AdminOrders: Array<any> = [];
  TotalPages: number = 1;
  TotalRecords: number = 1;
  FetchModel: FetchOrderModel = initializeFetchOrderModel();
  searchKeywordControl: FormControl = new FormControl("");
  OrderTypes: Array<any> = [{ name: "Lunch", value: "lunch" }, { name: "Dinner", value: "dinner" }]
  FilteredAdminOrders: Array<any> = [];
  constructor(private orderService: AdminOrdersService,private dialogService:DialogService,
    private messageService:MessageService) {

  }

  ngOnInit(): void {
    this.GetAdminCompletedOrders()
  }

  GetAdminCompletedOrders() {
    this.orderService.GetAdminCompletedOrders(this.FetchModel).subscribe((res: any) => {
      if (res?.statusCode == 200) {
        this.AdminOrders = res?.data;
        this.FilteredAdminOrders = res?.data
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

  ViewOrder(order: any) {
    const orderData = {...order,ref:'admin-created',isCompleted:true}
    const ref = this.dialogService.open(OrderInvoiceComponent, {
      header: order?.username + ' ' + 'Order',
      width: '60%',
      data: orderData
    });
    ref.onClose.subscribe((result: any) => {
      if(result){
        this.messageService.add({severity:'success',summary:'Order processed to complete'});
        this.AdminOrders = this.AdminOrders.filter((orders:any)=> orders?._id !== order?._id);
        this.FilteredAdminOrders = this.AdminOrders
      }
    })
  }

}


