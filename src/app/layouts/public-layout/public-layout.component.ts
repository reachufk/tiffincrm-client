import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
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

  loggedIn:boolean=false
  constructor(private activatedRoute:ActivatedRoute,private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.userCart.pipe(map((show)=>{
      if(!show){
        this.loggedIn=false
      }
    })).subscribe()
    this.activatedRoute.data.pipe(map((data:any)=>{
      if(data?.user){
        this.loggedIn=true
        return
      }
      this.loggedIn=false
    })).subscribe()

   

  }

}
