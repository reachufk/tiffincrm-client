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
  userCart:BehaviorSubject<boolean>;
  constructor(private http: HttpClient) {
    this.LoggedInUser = new BehaviorSubject<IloggedUser>(
      JSON.parse(localStorage.getItem('loggedInUser'))
    )
    this.userCart = new BehaviorSubject<boolean>(true)
  }

  public get getLoggedInUserValue():IloggedUser {
    return this.LoggedInUser.value;
  }

  SetUser(user:IloggedUser){
    this.LoggedInUser.next(user);
  }

  Logout(){
    this.LoggedInUser.next(null);
    this.userCart.next(false)
    localStorage.removeItem('loggedInUser')
  }

  SignupUser(data: IUser) {
    return this.http.post(`${environment.server}User/RegisterUser`, data)
  }

  VerifyOTP(data: IOTP) {
    return this.http.post(`${environment.server}api/auth/verify-otp`, data)
  }
  Login(data: any) {
    return this.http.post(`${environment.server}User/Login`, data)
  }

}
