import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { map, Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CartService } from '../services/cart.service';
import * as regionData from '../../tiffin-landing/availRegions.json';

@Component({
  selector: 'public-nav',
  templateUrl: './public-nav.component.html',
  styleUrls: ['./public-nav.component.scss']
})

export class PublicNavComponent implements OnInit, OnDestroy {
  collapsed: boolean = true
  regions: MenuItem[] = [];
  selected: FormControl = new FormControl(null)
  Items: MenuItem[] = [
    { label: 'My Orders', icon: 'pi pi-shopping-cart', routerLink: '/public/my-orders' },
    { label: 'Logout', icon: 'pi pi-sign-out' },
    { label: 'My profile', icon: 'pi pi-user' },
    { label: 'Login', icon: 'pi pi-sign-in', routerLink: '/auth/login' }
  ]
  selectedRegion: FormControl = new FormControl(this.authService.Region.value);
  cartItemsLength: number = 0;
  loggedIn: boolean = false
  Destroy: Subject<void> = new Subject();
  NavItems: MenuItem[] = this.Items;
  showConfirmation: boolean = false;
  items = [];
  url: string = '';
  showSelected: boolean = false;

  constructor(private authService: AuthService, private router: Router,
    private cartService: CartService, private activatedRoute: ActivatedRoute) {
    this.url = router.url;
    const { regions } = regionData
    this.regions = regions
  }

  ngOnDestroy(): void {
    this.Destroy.next()
    this.Destroy.complete()
  }

  ngOnInit(): void {
    this.router.events.pipe(takeUntil(this.Destroy), map((event: NavigationEnd) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url
      }
    })).subscribe()

    this.activatedRoute.data.pipe(takeUntil(this.Destroy), map((data: any) => {
      if (data?.user) {
        const pullOut = ['Login'];
        this.Items = this.NavItems.filter((item: MenuItem) => !pullOut.includes(item?.label))
      } else {
        const pullOut = ['My Orders', 'Logout', 'My profile']
        this.Items = this.NavItems.filter((item: MenuItem) => !pullOut.includes(item?.label))
      }
    })).subscribe()
    this.cartItemsLength = this.cartService.CartItems.value;
    this.selectedRegion.valueChanges.subscribe((region) => {
      if (region) {
        this.showSelected = true;
      }
    });
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
    switch (item.label) {
      case 'Logout':
        this.Items = [
          { label: 'Login', icon: 'pi pi-sign-in', routerLink: '/auth/login' }
        ]
        this.authService.Logout();
        this.router.navigate(['/public/home']);
        break;
      case 'My profile':
        this.router.navigate(['/public/profile']);
        this.selected.reset();
        break;
      default:
        this.selected.reset();
        this.router.navigate([item.routerLink])
    }
  }

  AcceptRegion() {
    this.authService.Region.next(this.selectedRegion.value);
    localStorage.setItem('selectedRegion', JSON.stringify(this.selectedRegion.value));
    return this.showSelected = false;
  }

  onDialogHide() {
    this.selectedRegion.patchValue(JSON.parse(localStorage.getItem('selectedRegion') || ''));
    return this.showSelected = false;
  }

  ResetRegion() {
    this.showSelected = false;
    this.selectedRegion.setValue(null);
  }

}
