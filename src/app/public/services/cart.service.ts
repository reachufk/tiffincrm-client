import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  CartItems:BehaviorSubject<number> = new BehaviorSubject<number>(3)

  constructor(private http:HttpClient) { }

   GetUserCart(user:String){
    return this.http.get(`${environment.server}User/GetCart/${user}`)
   }

   AddCartItem(user:String,item:any){
    return this.http.post(`${environment.server}User/AddCartItem/${user}`,item)
   }

   RemoveCartItem(user:String,item:any){
    return this.http.post(`${environment.server}User/RemoveCartItem/${user}`,item)
   }
   UpdateCartItem(user:string,item:any){
    return this.http.put(`${environment.server}User/UpdateCartItem/${user}`,item)
   }

}
