import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AdminOrdersService } from '../../services/admin-orders.service';
@Component({
  selector: 'app-order-invoice',
  templateUrl: './order-invoice.component.html',
  styleUrls: ['./order-invoice.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [MessageService]
})
export class OrderInvoiceComponent implements OnInit {
  @ViewChild('invoice') invoice: ElementRef;
  OrderDetails: any = {};
  adminOrderService = inject(AdminOrdersService);
  isAdminCreated: boolean = false;
  isCompleted: boolean = false;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig,
    private messageService: MessageService) {
    this.OrderDetails = this.config.data
  }
  customOrderId: string = null;

  ngOnInit(): void {
    if (this.config?.data) {
      const { ref, isCompleted, _id, userInfo: { phoneNumber, username } } = this.config?.data;
      ref && (this.isAdminCreated = true);
      isCompleted && (this.isCompleted = true);
      if (_id && phoneNumber && username) {
        this.customOrderId = `${username.substr(0, 2)}${_id.substr(-2)}${phoneNumber.substr(7, 2)}`;
      }
    }
  }

  ProcessToComplete() {
    if (this.OrderDetails?.isCompleted) {
      delete this.OrderDetails.isCompleted
    }
    if (this.config?.data?.ref) {
      this.ProcessToCompleteAdminOrder()
      return
    }
    this.adminOrderService.SetCompletedOrder(this.OrderDetails).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.ref.close(true)
      } else {
        this.messageService.add({ severity: 'success', summary: res?.message })
      }
    })
  }

  ProcessToCompleteAdminOrder() {
    this.OrderDetails.orderPaymentStatus = 'completed'
    delete this.OrderDetails.ref
    this.adminOrderService.UpdateAdminCreatedOrder(this.OrderDetails).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.ref.close(true)
      } else {
        this.messageService.add({ severity: 'success', summary: res?.message })
      }
    })
  }
}
