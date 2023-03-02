import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ufklogo',
  templateUrl: './ufklogo.component.html',
  styleUrls: ['./ufklogo.component.css']
})
export class UfklogoComponent implements OnInit {
  copyRightDate: number;

  constructor() { }

  ngOnInit() {
    this.copyRightDate = Date.now();
  }

}
