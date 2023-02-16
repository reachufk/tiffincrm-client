import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdmiOrdersService {

  constructor(private http:HttpClient) { 

  }

  GetOrders(){
    const eventSource = new EventSource(`${environment.server}User/GetOrders`)
     eventSource.onmessage = function (event) {
      console.log(event.data)
      event
    }
  }


  public closeEventSource(): void {
  }
}
