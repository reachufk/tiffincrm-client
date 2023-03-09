import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AdminOrdersService } from '../../services/admin-orders.service';
import { OrderInvoiceComponent } from '../order-invoice/order-invoice.component';

@Component({
  selector: 'app-future-orders',
  templateUrl: './future-orders.component.html',
  styleUrls: ['./future-orders.component.scss'],
  providers:[DialogService]
})
export class FutureOrdersComponent implements OnInit {

  FutureOrders:Array<any>=[];
  FilteredFutureOrders:Array<any>=[];
  constructor(private adminOrderService:AdminOrdersService,private dialogService: DialogService,
    private messageService : MessageService){

  }


  ngOnInit(): void {
    this.GetFutureOrders()
  }

  GetFutureOrders(){
    this.adminOrderService.GetFutureOrders().subscribe((res:any)=>{
      if(res?.statusCode == 200){
        this.FutureOrders = res?.data;
        this.FilteredFutureOrders = res?.data
      }
    })
  }

  orderTypeFilter(event) {
    if (!event?.value?.length) {
      this.FilteredFutureOrders = this.FutureOrders
      return
    }
    const selectedValues: Array<String> = event?.value;
    this.FilteredFutureOrders = this.FutureOrders.filter((order: any) => selectedValues?.includes(order?.orderType));
  }

  ViewOrder(order: any) {
    const ref = this.dialogService.open(OrderInvoiceComponent, {
      header: order?.userInfo?.username + ' ' + 'Order',
      width: '60%',
      data: order
    });
    ref.onClose.subscribe((result: any) => {
      if(result){
        this.messageService.add({severity:'success',summary:'Order processed'});
        this.FutureOrders = this.FutureOrders.filter((orders:any)=> orders?._id !== order?._id)
        this.FutureOrders = this.FutureOrders
      }
    })

}

}