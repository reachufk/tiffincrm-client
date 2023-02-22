import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  products: any[];
  responsiveOptions: any[];

  constructor() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit() {

    this.products = [
      { name: 'q', price: '20', inventoryStatus: 'i' },
      { name: 'w', price: '20', inventoryStatus: 'i' },
      { name: 'e', price: '20', inventoryStatus: 'i' },
      { name: 'r', price: '20', inventoryStatus: 'i' },
      { name: 'q', price: '20', inventoryStatus: 'i' },
      { name: 'w', price: '20', inventoryStatus: 'i' },
      { name: 'e', price: '20', inventoryStatus: 'i' },
      { name: 'r', price: '20', inventoryStatus: 'i' }
    ];

  }

}