import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import * as regionData from './availRegions.json'
import { IRegion } from "../shared/interfaces/regions";

@Component({
  selector: 'app-tiffin-landing',
  templateUrl: './tiffin-landing.component.html',
  styleUrls: ['./tiffin-landing.component.scss'],
})
export class TiffinLandingComponent implements OnInit, OnDestroy {
  highLights: string[] = [];
  availablePlaces: IRegion[] = [];
  allRegions: IRegion[] = [];
  results: Array<any> = [];
  selected: IRegion;
  highLight: string = 'Hungry?';
  counter: number = 0;
  changeClass: boolean = true;
  showSelected: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const { regions } = regionData;
    this.allRegions = regions;
    this.availablePlaces = regions.slice(0, 14);;
    this.highLights = [
      'Cooking gone wrong?',
      'Movie marathon?',
      'Unexpected guests?',
      'Late night at office?',
      'Hungry?'
    ]
  }

  search(event: any) {
    this.results = this.allRegions.filter((region: IRegion) => region.label.toLowerCase().includes(event?.query?.toLowerCase()))
  }

  selectChange(region: IRegion) {
    this.showSelected = true;
    this.selected = region;
  }

  SetGo() {
    this.showSelected = false;
    this.authService.Region.next(this.selected);
    localStorage.setItem('selectedRegion', JSON.stringify(this.selected));
    this.router.navigate(['/public/home']);
  }

  skip() {
    this.showSelected = false;
    localStorage.removeItem('selectedRegion');
    this.router.navigate(['/public/home'])
  }

  closeDialog() {
    this.selected = JSON.parse(localStorage.getItem('selectedRegion')) || '';
    this.SetGo();
  }
  ngAfterViewInit() {
    setInterval(() => {
      this.counter === this.highLights.length && (this.counter = 0)
      this.highLight = this.highLights[this.counter];
      this.changeClass = !this.changeClass;
      this.counter++;
    }, 3000);
  }

  newLocation(region: any) {
    this.selected = region;
    this.SetGo();
  }


  ngOnDestroy() {
    this.showSelected = false;
  }
}
