import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
  private http = inject(HttpClient)
  constructor() { }

  getUsers(fetchPayload:any) {
    const query = new HttpParams(fetchPayload) 
    return this.http.post(`${environment.server}User/GetUsers`,fetchPayload)
  }


}
