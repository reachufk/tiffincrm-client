import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor() {

  }

  imageObject: Array<object> = [
    {
      image: './../../../assets/img/logo.png',
      thumbImage: './../../../assets/img/logo.png',
      alt: 'Image alt'
    }, {
      image: './../../../assets/img/logo.png',
      thumbImage: './../../../assets/img/logo.png',
      alt: 'Image alt'
    },
    {
      image: './../../../assets/img/logo.png',
      thumbImage: './../../../assets/img/logo.png',
      alt: 'Image alt'
    }, {
      image: './../../../assets/img/logo.png',
      thumbImage: './../../../assets/img/logo.png',
      alt: 'Image alt'
    }, {
      image: './../../../assets/img/logo.png',
      thumbImage: './../../../assets/img/logo.png',
      alt: 'Image alt'
    },
    {
      image: './../../../assets/img/logo.png',
      thumbImage: './../../../assets/img/logo.png',
      alt: 'Image alt'
    }, {
      image: './../../../assets/img/logo.png',
      thumbImage: './../../../assets/img/logo.png',
      alt: 'Image alt'
    }, {
      image: './../../../assets/img/logo.png',
      thumbImage: './../../../assets/img/logo.png',
      alt: 'Image alt'
    },
    {
      image: './../../../assets/img/logo.png',
      thumbImage: './../../../assets/img/logo.png',
      alt: 'Image alt'
    }, {
      image: './../../../assets/img/logo.png',
      thumbImage: './../../../assets/img/logo.png',
      alt: 'Image alt'
    }
  ];

  ngOnInit() {



  }

}