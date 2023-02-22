import { Component, inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { validateAllFormFields } from 'src/app/shared/utils/formUtils';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  signupForm: FormGroup;
  OTPverificationForm: FormGroup
  showRegistrationForm: boolean = true;
  textList: string[] = [];
  showText: string;
  date: number = Date.now();

  constructor(private authService: AuthService, @Optional() private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.createSignupFormForm();
    this.createVerifyOTPForm();
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

  createSignupFormForm() {
    this.signupForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      mobile: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

  createVerifyOTPForm() {
    this.OTPverificationForm = new FormGroup({
      otp: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    })
  }

  signupUser() {
    validateAllFormFields(this.signupForm)
    if (!this.signupForm.valid) {
      return this.messageService.add({ severity: 'danger', summary: 'All fields are required.' });
    }
    const { value } = this.signupForm;
    this.authService.SignupUser(value).subscribe((res: any) => {
      debugger
      if (res?.statusCode == 200) {
        this.messageService.add({ severity: 'success', summary: res?.message || 'Account registred successfully.' });
        this.showRegistrationForm = false;
      }
    })
  }

  verifyOTP() {
    validateAllFormFields(this.OTPverificationForm)
    if (!this.OTPverificationForm.valid) {
      return this.messageService.add({ severity: 'danger', summary: 'OTP is required.' });
    }
    const { otp } = this.OTPverificationForm.value;
    const { mobile } = this.signupForm.value;
    this.authService.VerifyOTP({
      otp,
      mobile
    }).subscribe((res: any) => {
      debugger
      if (res?.statusCode == 200) {
        this.messageService.add({ severity: 'success', summary: res?.message || 'Account registred successfully.' });
      }
    })
  }

}
