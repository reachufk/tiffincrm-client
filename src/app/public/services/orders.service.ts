import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import  {io} from 'socket.io-client';
import { FetchOrderModel } from 'src/app/shared/interfaces/fetch-completed-orders';
@Injectable()
export class OrdersService {

  private socket: any;
  constructor(private http: HttpClient) {
  }

  GetCompletedOrders(FetchCompOrderModel:FetchOrderModel){
    return this.http.post(`${environment.server}Orders/GetCompletedOrders`,FetchCompOrderModel)
  }
  GetLatestOrders(){
    return this.http.get(`${environment.server}Orders/GetLatestOrders`)
  }

  CreateRpayOrder(OrderOption:any){
    return this.http.post(`${environment.server}Orders/CreateRpayOrder`,OrderOption)
  }

  VerifyPayment(verifyModel:any){
    return this.http.post(`${environment.server}Orders/VerifyPayment`,verifyModel)
  }

  PlaceOrder(OrderModel:any){
    return this.http.post(`${environment.server}Orders/PlaceOrder`,OrderModel)
  }
  FetchNewCreatedOrder(): Observable<any> {
    return new Observable((observer) => {  this.socket.on('newOrder', (order) => {
        observer.next(order);
      });
    });
  }

  GetUserOrders(user:String){
    return this.http.get(`${environment.server}Orders/GetUserOrders/${user}`)
  }

  disconnect(){
    this.socket.on('disconnect', () => {
      console.log('connected to server');
    });
  }


}
