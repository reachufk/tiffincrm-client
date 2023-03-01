import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http:HttpClient) { }

  GetBanners(){
    return this.http.get(`${environment.server}Banners/GetBanners`)
  }
  SaveBanner(Banner:any){
    return this.http.post(`${environment.server}Banners/SaveBanner`,Banner)
  }
  UpdateBanner(Banner:any){
    return this.http.put(`${environment.server}Banners/UpdateBanner/${Banner._id}`,Banner)
  }
  DeleteBanner(BannerID:any){
    return this.http.delete(`${environment.server}Banners/DeleteBanner/${BannerID}`)
  }

}
