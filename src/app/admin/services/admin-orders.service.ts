import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import  {io} from 'socket.io-client';
import { FetchOrderModel } from 'src/app/shared/interfaces/fetch-completed-orders';
@Injectable()
export class AdminOrdersService {

  private socket: any;
  constructor(private http: HttpClient) {
  }
  connect() {
    this.socket = io(`http://localhost:3000`, { transports: ['websocket'] });
    this.socket.on('connect', () => {
      console.log('connected to server');
    });
  }

  GetCompletedOrders(FetchCompOrderModel:FetchOrderModel){
    return this.http.post(`${environment.server}Orders/GetCompletedOrders`,FetchCompOrderModel);
  }
  GetLatestOrders(){
    return this.http.get(`${environment.server}Orders/GetLatestOrders`);
  }
  SetCompletedOrder(orderID:string){
    return this.http.get(`${environment.server}Orders/SetCompletedOrder/${orderID}`);
  }

  FetchNewCreatedOrder(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('newOrder', (order:any) => {
        observer.next(order);
      });
    });
  }

  GetAdminCreatedOrders(payload:any){
    return this.http.post(`${environment.server}Orders/GetAdminOrders`,payload)
  }


  disconnect(){
    this.socket.on('disconnect', () => {
      console.log('connected to server');
    });
  }


}
