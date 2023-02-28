import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { map, Subject, take, takeUntil } from 'rxjs';
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
  collapsed: boolean = true
  regions: MenuItem[] = []
  Items: MenuItem[] = [{label:'My Profile',icon:'pi pi-user'},
  {label:'Logout',icon:'pi pi-sign-out'},
  {label:'Login',icon:'pi pi-sign-in',routerLink:'/auth/login'},
  {label:"Cart", icon:'pi pi-shopping-cart',routerLink:'/public/cart'}]
  selectedRegion: string = ''
  cartItemsLength: number = 0;
  loggedIn: boolean = false
  Destroy: Subject<void> = new Subject();
  NavItems:MenuItem[] = this.Items;
  constructor(private authService: AuthService, private router: Router,
     private cartService: CartService, private activatedRoute:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(map((data:any)=>{
      if(data?.user){
        const pullOut=['Login'];
        this.Items =  this.NavItems.filter((item:MenuItem)=> !pullOut.includes(item?.label) )
      }else{
        const pullOut=['My Profile','Logout','Cart']
        this.Items =  this.NavItems.filter((item:MenuItem)=> !pullOut.includes(item?.label) )
      }
    })).subscribe()

    this.cartItemsLength = this.cartService.CartItems.value
  }


  stickHeader: boolean = false
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.stickHeader = window.scrollY < 110.00 ? false : true;
  }

  NavigateToSignIn() {
    this.router.navigate(['/auth/login'], { queryParams: { state: this.router.url } })
  }

  NavigateTo(item:MenuItem){
    if(item?.routerLink){
      this.router.navigate([item.routerLink])
      return
    }
    if(item?.label == 'Logout'){
      const pullOut=['My Profile','Logout','Cart']
      this.Items =  this.NavItems.filter((item:MenuItem)=> !pullOut.includes(item?.label) );
      this.authService.Logout()
      this.router.navigate(['/public/home'])
    }

  }

  // GetLogoutStatus(){
  //   debugger
  //   this.authService.getLoggedInUserValue.pipe(map((user:IloggedUser)=>{
  //     if(user){
  //       const pullOut=['Login'];
  //       this.Items =  this.NavItems.filter((item:MenuItem)=> !pullOut.includes(item?.label) )
  //     }else{
  //       const pullOut=['My Profile','Logout','Cart']
  //       this.Items =  this.NavItems.filter((item:MenuItem)=> !pullOut.includes(item?.label) )
  //     }
  //   })).subscribe()
  // }




}
