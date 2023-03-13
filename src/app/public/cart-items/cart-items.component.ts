import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { map } from 'rxjs';
import { IloggedUser } from 'src/app/shared/interfaces/auth';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss'],
})
export class CartItemsComponent implements OnInit, OnChanges {

  totalItems: number = 0;
  user: IloggedUser = null;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedInUser'));
    this.getCartItems();
  }

  ngOnChanges() {
  }

  getCartItems() {
    this.cartService.GetUserCart(this.user?.user).subscribe((res: any) => {
      this.totalItems = res?.data?.cartItems?.length || 0;
    })
  }
}
