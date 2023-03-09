import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IloggedUser, IOTP, IUser } from 'src/app/shared/interfaces/auth';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: "root"
})
export class AuthService {
  LoggedInUser: BehaviorSubject<IloggedUser>;
  userCart: BehaviorSubject<boolean>;
  Region: BehaviorSubject<any>;
  constructor(private http: HttpClient) {
    this.LoggedInUser = new BehaviorSubject<IloggedUser>(
      JSON.parse(localStorage.getItem('loggedInUser'))
    )
    this.Region = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('selectedRegion'))
    )
    this.userCart = new BehaviorSubject<boolean>(true)
  }

  public get getLoggedInUserValue(): IloggedUser {
    if(!this.LoggedInUser.value){
      return JSON.parse(localStorage.getItem('loggedInUser'))
    }
    return this.LoggedInUser.value;
  }

  SetUser(user: IloggedUser) {
    this.LoggedInUser.next(user);
  }

  Logout() {
    this.LoggedInUser.next(null);
    this.userCart.next(false)
    localStorage.removeItem('loggedInUser')
  }

  SignupUser(phoneNumber: string) {
    return this.http.post(`${environment.server}User/RegisterUser`, phoneNumber);
  }

  VerifyOTP(data: IUser) {
    return this.http.post(`${environment.server}User/verify-otp`, data);
  }
  Login(data: any) {
    return this.http.post(`${environment.server}User/Login`, data);
  }

}
