import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Catagory } from 'src/app/shared/interfaces/catagory';
import { FetchCatagoryItems } from 'src/app/shared/interfaces/fetch-catagory-items';
import { CatagoryItem } from 'src/app/shared/interfaces/catagory-item';
import { environment } from 'src/environments/environment';
import { IOTP, IUser } from 'src/app/shared/interfaces/auth';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  SignupUser(data: IUser) {
    return this.http.post(`${environment.server}User/RegisterUser`, data)
  }

  VerifyOTP(data: IOTP) {
    return this.http.post(`${environment.server}api/auth/verify-otp`, data)
  }


  SaveCatagory(Catagory: Catagory) {
    return this.http.post(`${environment.server}Inventory/SaveCatagory`, Catagory)
  }
  UpdateCatagory(Catagory: Catagory) {
    return this.http.put(`${environment.server}Inventory/UpdateCatagory/${Catagory._id}`, Catagory)
  }
  DeleteCatagory(catagoryID: string) {
    return this.http.delete(`${environment.server}Inventory/DeleteCatagory/${catagoryID}`)
  }
  GetCatagoryItems(fetchCatagoryItem: FetchCatagoryItems) {
    return this.http.post(`${environment.server}Inventory/GetCatagoryItems`, fetchCatagoryItem)
  }
  SaveCatagoryItem(CatagoryItem: CatagoryItem) {
    return this.http.post(`${environment.server}Inventory/SaveCatagoryItem`, CatagoryItem)
  }
  UpdateCatagoryItem(CatagoryItem: CatagoryItem) {
    return this.http.put(`${environment.server}Inventory/UpdateCatagoryItem/${CatagoryItem._id}`, CatagoryItem)
  }
  DeleteCatagoryItem(catagoryItemID: string) {
    return this.http.delete(`${environment.server}Inventory/DeleteCatagoryItem/${catagoryItemID}`)
  }

}
