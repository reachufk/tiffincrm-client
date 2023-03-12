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



}
