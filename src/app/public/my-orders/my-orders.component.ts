import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { map, Observable } from 'rxjs';
import { IloggedUser } from 'src/app/shared/interfaces/auth';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  providers: [MessageService, OrdersService]
})
export class MyOrdersComponent implements OnInit {
  emptyOrders: boolean = false;
  totalItems: number = 0
  Orders: Observable<any>;
  User: IloggedUser = JSON.parse(localStorage.getItem('loggedInUser'))
  constructor(private messageService: MessageService, private orderService: OrdersService) {

  }
  ngOnInit(): void {
    this.GetUserOrders()
  }

  GetUserOrders() {
   this.Orders =  this.orderService.GetUserOrders(this.User?.user).pipe(map((orders: any) => {
      if (orders?.statusCode == 200) {
        this.emptyOrders = false
        this.totalItems = orders?.data?.length
        return orders?.data
      }else{
        this.emptyOrders = true;
      }
    }))
  }


}
