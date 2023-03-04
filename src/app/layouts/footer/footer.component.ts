import { Component, OnInit } from '@angular/core';
import { single } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  copyRightDate: number;
  constructor() { }

  ngOnInit() {
    this.copyRightDate = Date.now();
  }

}
