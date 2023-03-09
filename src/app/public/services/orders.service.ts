import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FetchOrderModel } from 'src/app/shared/interfaces/fetch-completed-orders';
@Injectable()
export class OrdersService {

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

  GetUserOrders(user:String){
    return this.http.get(`${environment.server}Orders/GetUserOrders/${user}`)
  }

}
