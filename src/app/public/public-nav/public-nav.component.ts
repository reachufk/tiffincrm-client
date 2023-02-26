import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IloggedUser } from 'src/app/shared/interfaces/auth';
import { CartService } from '../services/cart.service';
import * as regionData from './regions.json'
@Component({
  selector: 'public-nav',
  templateUrl: './public-nav.component.html',
  styleUrls: ['./public-nav.component.scss']
})
export class PublicNavComponent implements OnInit {
  collapsed: boolean = false
  regions: MenuItem[] = []
  selectedRegion: string = ''
  cartItemsLength: number = 0;
  loggedIn: boolean = false
  constructor(private authService: AuthService, private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    const selected = this.authService?.SelectedRegion?.value
    this.selectedRegion = selected ? selected : ''
    this.GetRegions();
    this.authService.LoggedInUser.subscribe((user: IloggedUser) => {
      if (user?.token) {
        this.loggedIn = true
        return
      }

    })
    this.cartItemsLength = this.cartService.CartItems.value
  }


  stickHeader: boolean = false
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.stickHeader = window.scrollY < 110.00 ? false : true;
  }

  GetRegions() {
    const data = regionData
    this.regions = data.regions
    this.regions.forEach((region: MenuItem) => {
      region.id = region.label?.toLowerCase();
      region.command = (event) => {
        this.regionChange(event?.item?.label)
      }
    })
  }

  regionChange(region: string) {
    this.selectedRegion = region;
    this.authService.SelectedRegion.next(this.selectedRegion);
    localStorage.setItem('selectedRegion', this.selectedRegion)
  }

  NavigateToSignIn() {
    this.router.navigate(['/auth/login'], { queryParams: { state: this.router.url } })
  }

  SignOut() {
    this.router.navigate(['/auth/login'])
  }

}
