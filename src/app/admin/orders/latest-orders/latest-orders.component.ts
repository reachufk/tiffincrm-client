import { Component ,Input,OnInit} from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AdmiOrdersService } from '../../services/admin-orders.service';
import { OrderInvoiceComponent } from '../order-invoice/order-invoice.component';

@Component({
  selector: 'app-latest-orders',
  templateUrl: './latest-orders.component.html',
  styleUrls: ['./latest-orders.component.scss'],
  providers:[DialogService]
})
export class LatestOrdersComponent implements OnInit {

  @Input() inputLatestOrder:any={}
  LatestOrders: Array<any> = []
  FilterdLatestOrders: any[];
  OrderTypes: Array<any> = [{ name: "Lunch", value: "lunch" }, { name: "Dinner", value: "dinner" }]

  constructor(private orderService:AdmiOrdersService,private dialogService:DialogService) {
  }
  ngOnInit(): void {
    this.orderService.connect()
    this.GetLatestOrders()
    this.orderService.FetchNewCreatedOrder().subscribe((order:any)=>{
      this.LatestOrders.push(order)
      this.LatestOrders?.reverse()
    })
  }

  GetLatestOrders() {
    this.orderService.GetLatestOrders().subscribe((res: any) => {
      if (res?.statusCode == 200) {
        this.LatestOrders = res?.orders;
        this.FilterdLatestOrders = res?.orders
      }
    })
  }

  orderTypeFilter(event) {
    if (!event?.value?.length) {
      this.FilterdLatestOrders = this.LatestOrders
      return
    }
    const selectedValues: Array<String> = event?.value;
    this.FilterdLatestOrders = this.LatestOrders.filter((order: any) => selectedValues?.includes(order?.orderType));
    console.log(this.FilterdLatestOrders)
  }

  ViewOrder(order:any){
    const ref = this.dialogService.open(OrderInvoiceComponent, {
      header: order?.userInfo?.firstName+ ' ' +'Order',
      width: '50%',
      data:order
  });
  }

}



