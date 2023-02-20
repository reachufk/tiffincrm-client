import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable()
export class AdminUserService {
  private http = inject(HttpClient)
  constructor() { }

  getUsers(fetchPayload: any) {
    return this.http.post(`${environment.server}User/GetUsers`, fetchPayload)
  }


}
