import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'public-nav',
  templateUrl: './public-nav.component.html',
  styleUrls: ['./public-nav.component.scss']
})
export class PublicNavComponent implements OnInit {
  collapsed:boolean=false
  selectedCountry: string;
  countries: any[];

  constructor() {
    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' }
    ];
  }

  ngOnInit(): void {
  }


  stickHeader:boolean=false
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.stickHeader = window.scrollY < 110.00 ? false : true;
  }


}
