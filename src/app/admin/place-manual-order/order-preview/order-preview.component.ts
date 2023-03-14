import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, map } from 'rxjs';
import { AdminOrderModel } from 'src/app/shared/interfaces/admin-order-model';
import { IstDatePipe } from 'src/app/shared/pipes/ist-date.pipe';
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
  latestDate: any;
  minDate: Date;
  maxDate: Date;
  currentDate: Date
  isFutureOrder:FormControl = new FormControl(false)
  deliveryTime:FormControl = new FormControl(null,[Validators.required]);
  orderModeControl:FormControl = new FormControl('offline',[Validators.required]);
  orderModes:Array<any> = [{label:'Online',value:'online'},{label:'Offline',value:'offline'}]
  orderPaymentStatusControl:FormControl=new FormControl(null)
  constructor(private placeOrderService: AdminPlaceOrderService, private router: Router,
    private messageService: MessageService,private ISTDate:IstDatePipe) {}

  ngOnDestroy(): void {
    this.Destroy.next();
    this.Destroy.complete()
  }
  ngOnInit(): void {
    this.currentDate = new Date();
    this.latestDate = this.currentDate.toISOString()
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    this.minDate = this.currentDate;
    const maxDate = new Date();
    maxDate.setDate(this.minDate.getDate() + 4);
    this.maxDate = maxDate;
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
    AdminOrderModel.orderMode = 'offline';
    AdminOrderModel.orderPaymentMode = this.orderModeControl.value;
    if(this.orderModeControl.value == 'online'){
      AdminOrderModel.orderPaymentStatus = 'pending';
    }else{
      AdminOrderModel.orderPaymentStatus = 'COD';
    }
    if(!this.isFutureOrder.value){
      AdminOrderModel.orderDeliveryTime = this.latestDate;
    }else{
      if(!this.deliveryTime.valid){
        return
      }
      AdminOrderModel.orderDeliveryTime = this.deliveryTime.value
      console.log(AdminOrderModel);
    }
    console.log(AdminOrderModel);
    const ist = this.ISTDate.transform(AdminOrderModel.orderDeliveryTime);
    AdminOrderModel.orderDeliveryTime = ist
    this.placeOrderService.PlaceAdminOrder(AdminOrderModel).subscribe((res:any)=>{
      if(res?.statusCode==201){
        this.messageService.add({ severity: 'success', summary: 'Order Placed!' });
        this.router.navigate(['/admin/orders'],{queryParams:{from:'admin-order-create'}})
      }
    })
  }

  GetOrderDetails() {
    // if(!this.placeOrderService.CustomerInfoSubject.value){
    //   this.router.navigate(['/admin/place-order/customer-info'])
    //   return
    // }
    // if(!this.placeOrderService.ItemsSubject.value){
    //   this.router.navigate(['/admin/place-order/items-selection'])
    //   return
    // }
    this.placeOrderService.CustomerInfoSubject.pipe(takeUntil(this.Destroy), map((info: any) => {
      this.OrderDetails.userInfo = info
    })).subscribe()
    this.placeOrderService.ItemsSubject.pipe(takeUntil(this.Destroy), map((items: any) => {
      this.OrderDetails.items = items;
      this.orderAmount = items?.reduce((acc, curr) => acc + (curr.itemPrice * curr?.count), 0);
    })).subscribe()
  }
}
