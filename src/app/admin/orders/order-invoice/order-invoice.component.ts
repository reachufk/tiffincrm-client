import { Component ,ViewEncapsulation,OnInit, ViewChild, ElementRef} from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-order-invoice',
  templateUrl: './order-invoice.component.html',
  styleUrls: ['./order-invoice.component.scss'],
  encapsulation:ViewEncapsulation.Emulated
})
export class OrderInvoiceComponent implements OnInit {
@ViewChild('invoice') invoice:ElementRef
  OrderDetails:any={}
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.OrderDetails = this.config.data
  }
  ngOnInit(): void {
  }


}
