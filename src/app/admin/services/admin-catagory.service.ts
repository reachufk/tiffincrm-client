import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Catagory } from 'src/app/shared/interfaces/catagory';
import { FetchCatagoryItems } from 'src/app/shared/interfaces/fetch-catagory-items';
import { CatagoryItem } from 'src/app/shared/interfaces/catagory-item';
import { environment } from 'src/environments/environment';
@Injectable()
export class AdminCatagoryService {

  constructor(private http: HttpClient) { }

  GetCatagories() {
    return this.http.get(`${environment.server}Inventory/GetCatagories`)
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
