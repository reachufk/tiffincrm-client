import { Component, OnInit, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.scss',
    "../../../../node_modules/primeicons/primeicons.css",
    "../../../../node_modules/primeng/resources/themes/lara-light-blue/theme.css",
    "../../../../node_modules/primeng/resources/primeng.min.css",
    "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"],
    encapsulation:ViewEncapsulation.ShadowDom
})
export class PublicLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
