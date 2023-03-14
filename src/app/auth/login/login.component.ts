import { Component, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validateAllFormFields } from 'src/app/shared/utils/formUtils';
import { AuthService } from '../services/auth.service';
import { IloggedUser } from 'src/app/shared/interfaces/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  forgotScreen: boolean = false;
  loginForm: FormGroup = new FormGroup({
    phoneNumber: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(13)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)])
  });
  OTPverificationForm: FormGroup
  showRegistrationForm: boolean = true;
  textList: string[] = [];
  showText: string;
  date: number = Date.now();
  error = ''
  hide: boolean = true;
  state: any;
  showPassword: boolean = false;
  mobileNoForgotScreen: FormControl = new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(13)])
  onVerify: boolean = false;
  optControl: FormControl = new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
  resetScreen:boolean = false;
  newPasswordControl:FormControl = new FormControl(null,[Validators.required])
  constructor(private authService: AuthService, @Optional() private messageService: MessageService,
    private router: Router, private activatedRoute: ActivatedRoute) {
    this.state = this.activatedRoute.snapshot.queryParamMap.get('state')?.split('"')[1]
  }

  ngOnInit(): void {
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

  Login() {
    validateAllFormFields(this.loginForm);
    if (this.loginForm.invalid) {
      return
    }
    this.authService.Login(this.loginForm.value).subscribe(async (res: any) => {
      if (res?.statusCode == 200) {
        this.authService.SetUser(res?.user);
        const loggedInUser: IloggedUser = res?.user;
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        this.navigateHandler(loggedInUser.role);
      } else {
        this.error = res?.message;
      }
    })
  }

  navigateHandler(role: String) {
    if (role == 'admin') {
      this.router.navigate(['/admin/dashboard'])
    } else {
      if (!this.state) {
        this.router.navigate(['/public/home']);
        return
      }
      const decodedURL = decodeURIComponent(this.state);
      this.router.navigate([decodedURL])
    }
  }

  SendForgotOtp() {
    validateAllFormFields(this.mobileNoForgotScreen)
    if (this.mobileNoForgotScreen.valid) {
      this.authService.SendForgotOTP(this.mobileNoForgotScreen.value).subscribe((res: any) => {
        if (res?.statusCode == 200) {
          this.error =''
          this.onVerify = true;
        }else{
          this.error = res.message
        }
      })
    }
  }
  VerifyForgotOtp() {
    validateAllFormFields(this.optControl)
    if (this.mobileNoForgotScreen.valid) {
      this.authService.VerifyForgotOTP(this.mobileNoForgotScreen.value,this.optControl.value).subscribe((res: any) => {
        if (res?.statusCode == 200) {
          this.resetScreen = true
          this.error =''
          return
        }
        this.error = res.message
      })
    }
  }
  ResetPassword(){
    validateAllFormFields(this.optControl)
    if (this.newPasswordControl.valid) {
      this.authService.ResetPassword(this.mobileNoForgotScreen.value,this.newPasswordControl.value).subscribe((res: any) => {
        if (res?.statusCode == 200) {
          this.resetScreen = false;
          this.onVerify = false;
          this.resetScreen=false
          this.error =''
          this.messageService.add({severity:'success',summary:'password changed ! please login with your new password'})
          
        }
      })
    }
  }
}
