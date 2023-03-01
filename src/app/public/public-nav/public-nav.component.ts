import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { map, Subject, take, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CartService } from '../services/cart.service';
import * as regionData from './regions.json'
@Component({
  selector: 'public-nav',
  templateUrl: './public-nav.component.html',
  styleUrls: ['./public-nav.component.scss'],
  providers: [ConfirmationService]
})
export class PublicNavComponent implements OnInit {
  collapsed: boolean = true
  regions: MenuItem[] = []
  Items: MenuItem[] = [{ label: 'My Profile', icon: 'pi pi-user' },
  { label: 'Logout', icon: 'pi pi-sign-out' },
  { label: 'Login', icon: 'pi pi-sign-in', routerLink: '/auth/login' }
  ]
  selectedRegion: FormControl = new FormControl();
  cartItemsLength: number = 0;
  loggedIn: boolean = false
  Destroy: Subject<void> = new Subject();
  NavItems: MenuItem[] = this.Items;
  showConfirmation: boolean = false;

  constructor(private authService: AuthService, private router: Router,
    private cartService: CartService, private activatedRoute: ActivatedRoute,
    private confirmService: ConfirmationService) {
  }

  ngOnInit(): void {

    const { regions } = regionData
    this.regions = regions
    this.selectedRegion.setValue(this.authService?.Region?.value)
    this.activatedRoute.data.pipe(map((data: any) => {
      if (data?.user) {
        const pullOut = ['Login'];
        this.Items = this.NavItems.filter((item: MenuItem) => !pullOut.includes(item?.label))
      } else {
        const pullOut = ['My Profile', 'Logout']
        this.Items = this.NavItems.filter((item: MenuItem) => !pullOut.includes(item?.label))
      }
    })).subscribe()

    this.cartItemsLength = this.cartService.CartItems.value;
    this.selectedRegion.valueChanges.pipe(takeUntil(this.Destroy), map((region: any) => {
      if(region){
        this.showConfirmation = true;
        return
      }
    })).subscribe()
  }


  stickHeader: boolean = false
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.stickHeader = window.scrollY < 110.00 ? false : true;
  }

  NavigateToSignIn() {
    this.router.navigate(['/auth/login'], { queryParams: { state: this.router.url } })
  }

  NavigateTo(item: MenuItem) {
    if (item?.routerLink) {
      this.router.navigate([item.routerLink])
      return
    }
    if (item?.label == 'Logout') {
      const pullOut = ['My Profile', 'Logout']
      this.Items = this.NavItems.filter((item: MenuItem) => !pullOut.includes(item?.label));
      this.authService.Logout()
      this.router.navigate(['/public/home'])
    }

  }

  AcceptRegion() {
    this.authService.Region.next(this.selectedRegion.value)
    localStorage.setItem('selectedRegion',JSON.stringify(this.selectedRegion.value));
    this.showConfirmation=false
  }

  ResetRegion(){
    this.showConfirmation=false
    this.selectedRegion.setValue(null)
  }

}
