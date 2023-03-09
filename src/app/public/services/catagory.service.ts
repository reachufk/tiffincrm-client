import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FetchCatagoryItems } from 'src/app/shared/interfaces/fetch-catagory-items';
import { environment } from 'src/environments/environment';

@Injectable()
export class CatagoryService {

  constructor(private http: HttpClient) { }

  GetCatagories() {
    return this.http.get(`${environment.server}Inventory/GetCatagories`)
  }

  GetCatagoryItems(fetchCatagoryItem: FetchCatagoryItems) {
    return this.http.post(`${environment.server}Inventory/GetCatagoryItems`, fetchCatagoryItem)
  }

}
