import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, map } from 'rxjs';
import { AdminOrderModel } from 'src/app/shared/interfaces/admin-order-model';
import { AdminPlaceOrderService } from '../../services/admin-place-order.service';

@Component({
  selector: 'app-order-preview',
  templateUrl: './order-preview.component.html',
  styleUrls: ['./order-preview.component.scss'],
  providers:[MessageService]
})
export class OrderPreviewComponent implements OnInit, OnDestroy {
  OrderDetails: { userInfo: {}, items: [], orderAmount: number } = { userInfo: {}, items: [], orderAmount: 0 }
  Destroy: Subject<void> = new Subject();
  orderAmount: number = 0
  constructor(private placeOrderService: AdminPlaceOrderService, private router: Router,
    private messageService: MessageService,) {}

  ngOnDestroy(): void {
    this.Destroy.next();
    this.Destroy.complete()
  }
  ngOnInit(): void {
    this.GetOrderDetails()
  }

  BackStep() {
    this.router.navigate(['/admin/place-order/-items-selection'])
  }

  PlaceOrder() {
    let AdminOrderModel: any = {}
    AdminOrderModel = { ...this.OrderDetails.userInfo };
    AdminOrderModel.orderItems = this.OrderDetails?.items;
    AdminOrderModel.orderAmount = this.orderAmount;
    this.placeOrderService.PlaceAdminOrder(AdminOrderModel).subscribe((res:any)=>{
      if(res?.statusCode==201){
        this.messageService.add({ severity: 'success', summary: 'Order Placed!' });
        this.router.navigate(['/admin/orders'],{queryParams:{from:'admin-order-create'}})
      }
    })
  }

  GetOrderDetails() {
    this.placeOrderService.CustomerInfoSubject.pipe(takeUntil(this.Destroy), map((info: any) => {
      this.OrderDetails.userInfo = info
    })).subscribe()
    this.placeOrderService.ItemsSubject.pipe(takeUntil(this.Destroy), map((items: any) => {
      this.OrderDetails.items = items;
      this.orderAmount = items?.reduce((acc, curr) => acc + (curr.itemPrice * curr?.count), 0);
    })).subscribe()
  }
}
