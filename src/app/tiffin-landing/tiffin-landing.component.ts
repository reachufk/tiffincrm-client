import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth/services/auth.service';
import * as regionData from './availRegions.json'
@Component({
  selector: 'app-tiffin-landing',
  templateUrl: './tiffin-landing.component.html',
  styleUrls: ['./tiffin-landing.component.scss'],
  providers:[MessageService]
})
export class TiffinLandingComponent implements OnInit {
  
  availablePlaces:Array<any>=[];
  results:Array<any>=[];
  selected :any
  constructor(private authService:AuthService,private router:Router){

  }
  ngOnInit(): void {
    const {regions} = regionData
    this.availablePlaces = regions
  }

  search(event){
    this.results = this.availablePlaces.filter((region:any)=> region?.label?.toLowerCase()?.includes(event?.query?.toLowerCase()))
  }


  selectChange(region){
    this.selected = region
  }

  SetGo(){
    this.authService.Region.next(this.selected);
    localStorage.setItem('selectedRegion',JSON.stringify(this.selected));
    this.router.navigate(['/public/home'])
  }

}
