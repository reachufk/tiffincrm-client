import { Component, inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { validateAllFormFields } from 'src/app/shared/utils/formUtils';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { IloggedUser } from 'src/app/shared/interfaces/auth';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: []
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup=new FormGroup({
    phoneNumber:new FormControl(null,[Validators.required,Validators.minLength(10),Validators.maxLength(13)]),
    password:new FormControl(null,[Validators.required,Validators.minLength(8)])
  });
  OTPverificationForm: FormGroup
  showRegistrationForm: boolean = true;
  textList: string[] = [];
  showText: string;
  date: number = Date.now();
  error=''
  hide:boolean=true;
  state:any;
  showPassword:boolean=false
  constructor(private authService: AuthService, @Optional() private messageService: MessageService,
  private router:Router,private activatedRoute:ActivatedRoute) {
    
  }

  ngOnInit(): void {
    const createdUserPhone = this.activatedRoute.snapshot.queryParamMap.get('registered')
    if(createdUserPhone){
    this.loginForm.get('phoneNumber').setValue(createdUserPhone)
    }
    this.textList = [
      'Unexpected guests?',
      'Game night?',
      'Cooking gone wrong?',
      'Movie marathon?',
      'Late night at office?',
      'Hungry'
    ];
    this.showText = this.textList[this.textList.length - 1]
  }

  ngAfterViewInit() {
    let i = 0;
    setInterval(() => {
      if (i === this.textList.length) {
        i = 0;
      }
      this.showText = this.textList[i++];
    }, 2048)
  }


  Login(){
    validateAllFormFields(this.loginForm);
    if(this.loginForm.invalid){
      return
    }
    this.authService.Login(this.loginForm.value).subscribe(async (res:any)=>{
      if(res?.statusCode==200){
        this.messageService.add({severity:'success',summary:'logged in sucessfully'})
        this.authService.SetUser(res?.user)
        const loggedInUser:IloggedUser = res?.user;
        localStorage.setItem('loggedInUser',JSON.stringify(loggedInUser));
        this.navigateHandler(loggedInUser.role)
      }else{
        this.error = res?.message
      }
     
    })
    
  }
  navigateHandler(role:String) {
    if (role == 'admin'){
      this.router.navigate(['/admin/dashboard'])
    }else{
      this.router.navigate(['/public/home'])
    }
    

    // this.state = this.activatedRoute?.snapshot?.queryParamMap?.get('state')
    // let path = decodeURIComponent(this.state);
    // console.log(path)
    // if(this.state){
    //   this.router.navigateByUrl(path)
    // }else{
    //   this.router.navigate(['/public/home'])
    // }
  }


}
