import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../auth/services/auth.service';
import * as regionData from './availRegions.json'
@Component({
  selector: 'app-tiffin-landing',
  templateUrl: './tiffin-landing.component.html',
  styleUrls: ['./tiffin-landing.component.scss'],
  providers: [MessageService]
})
export class TiffinLandingComponent implements OnInit {
  highLights: string[] = [];
  availablePlaces: Array<any> = [];
  results: Array<any> = [];
  selected: any;
  highLight: string = 'Hungry?';
  counter: number = 0;
  changeClass: boolean = true;
  showSelected: boolean = false;
  constructor(private authService: AuthService, private router: Router) {

  }
  ngOnInit(): void {
    const { regions } = regionData;
    this.availablePlaces = regions;
    this.highLights = [
      'Cooking gone wrong?',
      'Movie marathon?',
      'Unexpected guests?',
      'Late night at office?',
      'Hungry?'
    ]
  }

  search(event) {
    this.results = this.availablePlaces.filter((region: any) => region?.label?.toLowerCase()?.includes(event?.query?.toLowerCase()))
  }


  selectChange(region) {
    this.showSelected = true;
    this.selected = region
  }

  SetGo() {
    this.showSelected = false;
    this.authService.Region.next(this.selected);
    localStorage.setItem('selectedRegion', JSON.stringify(this.selected));
    this.router.navigate(['/public/home'])
  }

  skip() {
    this.showSelected = false;
    localStorage.removeItem('selectedRegion');
    this.router.navigate(['/public/home'])
  }

  ngAfterViewInit() {
    setInterval(() => {
      if (this.counter == this.highLights.length) {
        this.counter = 0;
      }
      this.highLight = this.highLights[this.counter];
      this.changeClass = !this.changeClass;
      this.counter++;
    }, 3000)
  }
}
