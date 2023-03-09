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

  GetTodaysUser() {
    return this.http.get(`${environment.server}User/TodaysUser`);
  }

  GetTodaysOrder() {
    return this.http.get(`${environment.server}User/TodaysOrder`);
  }

  GetTodaysSales() {
    return this.http.get(`${environment.server}User/GetTodaysSales`);
  }

  GetUsersAnalyticsDaily() {
    return this.http.get(`${environment.server}User/GetUsersAnalyticsDaily`);
  }

  GetOrdersAnalyticsDaily() {
    return this.http.get(`${environment.server}User/GetOrdersAnalyticsDaily`);
  }

  GetUsersAnalyticsMonthly() {
    return this.http.get(`${environment.server}User/GetUsersAnalyticsMonthly`);
  }

  GetOrdersAnalyticsMonthly() {
    return this.http.get(`${environment.server}User/GetOrdersAnalyticsMonthly`);
  }

}
