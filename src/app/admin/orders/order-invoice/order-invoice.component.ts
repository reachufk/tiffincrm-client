import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AdminOrdersService } from '../../services/admin-orders.service';
@Component({
  selector: 'app-order-invoice',
  templateUrl: './order-invoice.component.html',
  styleUrls: ['./order-invoice.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  providers:[MessageService]
})
export class OrderInvoiceComponent implements OnInit {
  @ViewChild('invoice') invoice: ElementRef
  OrderDetails: any = {};
  adminOrderService = inject(AdminOrdersService)
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig,
    private messageService:MessageService) {
    this.OrderDetails = this.config.data
  }

  ngOnInit(): void {
  }

  ProcessToComplete() {
    this.adminOrderService.SetCompletedOrder(this.OrderDetails._id).subscribe((res:any)=>{
      if(res.statusCode == 200){
        this.messageService.add({severity:'success',summary:'Order processed'})
        this.ref.close(true)
      }else{
        this.messageService.add({severity:'success',summary:res?.message})
      }
    })

  }

}
