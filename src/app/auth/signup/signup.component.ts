import { Component, inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { validateAllFormFields } from 'src/app/shared/utils/formUtils';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { NgOtpInputComponent } from 'ng-otp-input';
import { Router } from '@angular/router';
import { PasswordDirective } from 'primeng/password';
import { IloggedUser } from 'src/app/shared/interfaces/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [],

})
export class SignupComponent implements OnInit {
  @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput: NgOtpInputComponent;
  signupForm: FormGroup;
  otpForm: FormGroup;
  showRegistrationForm: boolean = true;
  textList: string[] = [];
  showText: string;
  date: number = Date.now();
  showOtp: boolean = false;
  showPassword: boolean = false
  constructor(private authService: AuthService, private messageService: MessageService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.createSignupFormForm();
    this.createOTPFormForm();
  }

  createSignupFormForm() {
    this.signupForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern(/^\+?\d+$/)]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()_+|{}\[\]\\:";'<>?,./]{8,}$/)]),
    })
  }

  createOTPFormForm() {
    this.otpForm = new FormGroup({
      otp: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    })
  }

  signupUser() {
    validateAllFormFields(this.signupForm);
    if (!this.signupForm.valid) {
      return this.messageService.add({ severity: 'danger', summary: 'All fields are required.' });
    }
    let { phoneNumber } = this.signupForm.value;
    if (!phoneNumber?.includes('+91')) {
      phoneNumber = `+91${phoneNumber}`
    }
    this.signupForm.get('phoneNumber').setValue(phoneNumber)
    this.authService.SignupUser(this.signupForm.value).subscribe((res: any) => {
      if (res?.statusCode == 200) {
        //this.messageService.add({ severity: 'success', summary: res?.message || 'Account registred successfully.' });
        this.messageService.add({ severity: 'success', summary: res?.message || 'OTP has been sent successfully.' });
        this.showOtp = true;
      }
    })
  }

  verifyOTP() {
    validateAllFormFields(this.otpForm);
    validateAllFormFields(this.signupForm);
    if (!this.otpForm.valid) {
      return this.messageService.add({ severity: 'danger', summary: 'OTP is required.' });
    }
    const { value } = this.otpForm;
    const { value: signupData } = this.signupForm;

    this.authService.VerifyOTP({
      ...value,
      signupData
    }).subscribe((res: any) => {
      if (res?.statusCode === 201) {
        this.messageService.add({ severity: 'success', summary: res?.message || 'Account registred successfully.' });
        this.authService.SetUser(res?.user)
        const loggedInUser: IloggedUser = res?.data;
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        this.router.navigate(['/public/home']);
        return
      }
      return this.messageService.add({ severity: 'warning', summary: res?.message || 'Invalid OTP' });
    })
  }

  onOtpChange(event) {
    // event.length == 6 ? this.otp.setValue(+event) : null
  }


}


