import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
export interface CustomerInfoDetail{
  userName:String,
  phoneNumber:number,
  email:String,
  orderAddress:String,
  orderType:String
}

export interface ItemsFetch{
  pageNo:number,
  pageSize:number,
  keyword:String
}
@Injectable()
export class AdminPlaceOrderService {
  ManualOrderInfo:Subject<any> = new Subject<any>();
  CustomerInfoSubject:BehaviorSubject<CustomerInfoDetail> = new BehaviorSubject<CustomerInfoDetail>(null);
  ItemsSubject:BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>(null);
  Step:BehaviorSubject<number>=new BehaviorSubject<number>(0)

  constructor(private http:HttpClient) { }

  GetAllItems(payload:ItemsFetch){
    return this.http.post(`${environment.server}Inventory/GetAllItems`,payload)
  }

  PlaceAdminOrder(Order:any){
    return this.http.post(`${environment.server}Orders/PlaceAdminOrder`,Order)
  }

}
