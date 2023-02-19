import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin/dashboard', title: 'Dashboard',  icon: 'pi pi-home', class: '' },
    { path: '/admin/orders', title: 'Orders',  icon:'pi pi-shopping-cart', class: '' },
    { path: '/admin/catagories', title: 'Catagories',  icon:'pi pi-list', class: '' },
    { path: '/admin/users', title: 'Users',  icon:'pi pi-user', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      // if ($(window).width() > 991) {
      //     return false;
      // }
      // return true;
  };
}
