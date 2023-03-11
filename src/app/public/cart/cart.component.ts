import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IloggedUser } from 'src/app/shared/interfaces/auth';
import { validateAllFormFields } from 'src/app/shared/utils/formUtils';
import { CartService } from '../services/cart.service';
import { OrdersService } from '../services/orders.service';
import { InitializeRPayOptions, IRazorPayOtpions } from '../checkout/IRazorPayOptions';
export interface OrderOptions {
  amount: number;
  currency: string
}
export interface VerifyPaymentModel {
  razorpay_payment_id: String,
  razorpay_order_id: String,
  razorpay_signature: String

}
declare var Razorpay: any
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [MessageService, OrdersService]
})
export class CartComponent implements OnInit {

  Items: Observable<any>
  totalItems: number = 0;
  totalAmount: number = 0
  DeliveryTimes: Array<{ label: string, value: string }> = [];
  OrderTypes: Array<{ label: string, value: string }> = [{ label: 'Lunch', value: 'lunch' }, { label: 'Dinner', value: 'dinner' }];
  DeliveryTimeControl: FormControl = new FormControl(null, [Validators.required]);
  OrderForm: FormGroup;
  RazorPayOptions: IRazorPayOtpions = InitializeRPayOptions();
  OrderOptions = {} as OrderOptions
  rzpay: any
  emptyCart: boolean = false;
  user: IloggedUser = JSON.parse(localStorage.getItem('loggedInUser'));

  minDate: Date;
  maxDate: Date;

  constructor(private cartService: CartService, private authService: AuthService,
    private messageService: MessageService, private orderService: OrdersService,
    private router: Router) {

  }
  ngOnInit(): void {

    this.CreateForm()
    this.GetCartItems()
  }

  GetCartItems() {
    this.Items = this.cartService.GetUserCart(this.user?.user).pipe(map((res: any) => {
      if (!res?.data?.cartItems?.length) {
        this.emptyCart = true
      }
      this.totalItems = res?.data?.cartItems?.length
      this.totalAmount = res?.data?.cartItems?.reduce((total: number, item: any) => {
        const amount = (item?.selectedItemType?.typeValue ? item?.selectedItemType?.typeValue : item?.itemPrice) * item.count;
        return total + amount;
      }, 0);
      this.OrderForm.get('orderItems').setValue(res?.data?.cartItems);
      this.OrderForm.get('orderAmount').setValue(this.totalAmount);
      return res?.data?.cartItems
    }))

    this.DeliveryTimes = [{ label: 'Today', value: '0' }, { label: 'Tomorrow', value: '1' }, { label: '2 Days', value: '2' }, { label: '3 Days', value: '3' }, { label: '4 days', value: '4' }, { label: '5 days', value: '5' }]

  }

  CreateForm() {
    this.OrderForm = new FormGroup({
      user: new FormControl(this.authService?.LoggedInUser?.value?.user, [Validators.required]),
      orderAddress: new FormControl(null, [Validators.required]),
      orderAmount: new FormControl(null, [Validators.required]),
      orderMode: new FormControl(null),
      orderItems: new FormControl([], [Validators.required]),
      orderPaymentMode: new FormControl(null),
      orderInstructions: new FormControl(null),
      orderDeliveryTime: new FormControl(null, [Validators.required]),
      orderType: new FormControl(null, [Validators.required]),
      orderPaymentStatus: new FormControl(""),
      userInfo: new FormControl({}),
      orderStatus: new FormControl("pending"),
    })
  }

  DeleteCartItem(item: any) {
    this.cartService.RemoveCartItem(this.user?.user, item).subscribe((res: any) => {
      if (res?.statusCode == 200) {
        this.messageService.add({ severity: 'success', summary: 'item removed from cart', life: 3000 });
        this.GetCartItems()
      } else {
        this.messageService.add({ severity: 'error', summary: res?.message, life: 3000 });
      }
    })
  }

  CheckOut() {
    validateAllFormFields(this.OrderForm)
    if (this.OrderForm.invalid) {
      return
    }
    this.RazorPayOptions.handler = (response: any) => { this.CheckPayment(response) };
    this.RazorPayOptions.modal.ondismiss = (response: any) => { this.CancelCheckout(response) };
    this.OrderOptions.amount = this.totalAmount * 100; // as rpaz takes unit of currency like paisa;
    this.OrderOptions.currency = 'INR';
    this.orderService.CreateRpayOrder(this.OrderOptions).subscribe((createdRes: any) => {
      this.RazorPayOptions.amount = createdRes?.data?.amount;
      this.RazorPayOptions.order_id = createdRes?.data?.id;
      this.RazorPayOptions.currency = createdRes?.data?.currency;
      this.RazorPayOptions.prefill.email = this.authService?.LoggedInUser?.value?.email;
      this.RazorPayOptions.prefill.contact = this.authService?.LoggedInUser?.value?.phoneNumber;
      this.OpenPayDilog();
    })
  }

  OpenPayDilog() {
    this.rzpay = new Razorpay(this.RazorPayOptions);
    this.rzpay.open()
  }

  CheckPayment(response: any) {
    let VerifyModel: VerifyPaymentModel = response
    this.orderService.VerifyPayment(VerifyModel).subscribe((res: any) => {
      if (res.statusCode == 200 && res?.verified) {
        const paymentData = res?.data;
        this.OrderForm.get('orderPaymentMode').setValue(paymentData?.method)
        this.OrderForm.get('orderPaymentStatus').setValue('paid');
        this.OrderForm.get('orderMode').setValue('online')
        this.PlaceOrder()
      } else {
        this.messageService.add({ severity: 'error', summary: 'payment not verified?', detail: 'please contact us at given below contacts', life: 3000 });
      }
    })
  }

  PlaceOrder() {
    this.orderService.PlaceOrder(this.OrderForm.value).subscribe((res: any) => {
      if (res?.statusCode == 200) {
        this.messageService.add({ severity: 'success', summary: 'payment completed successfully!', detail: 'Your order is in process', life: 3000 });
        this.router.navigate(['/public/my-orders'])
      } else {
        this.messageService.add({ severity: 'success', summary: res?.message, life: 3000 });
      }
    })
  }

  CancelCheckout(res: any) {
    console.log(res, 'cancel');
  }

}
