import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss', 
  "../../../../node_modules/primeicons/primeicons.css",
  "../../../../node_modules/primeng/resources/themes/lara-light-blue/theme.css",
  "../../../../node_modules/primeng/resources/primeng.min.css",
  "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css"],
  encapsulation:ViewEncapsulation.ShadowDom
})
export class AuthLayoutComponent implements OnInit {
  constructor(public location: Location, private router: Router) { }
  ngOnInit(): void {
  }

  ngAfterViewInit() {
    //this.runOnRouteChange();
  }
  isMaps(path) {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);
    if (path == titlee) {
      return false;
    }
    else {
      return true;
    }
  }
  runOnRouteChange(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemMainPanel = <HTMLElement>document.querySelector('.main-panel');
  
    }
  }
  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }

}
