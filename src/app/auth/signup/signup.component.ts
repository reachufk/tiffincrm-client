import { Component, inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { validateAllFormFields } from 'src/app/shared/utils/formUtils';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { NgOtpInputComponent } from 'ng-otp-input';
import { Router } from '@angular/router';
import { PasswordDirective } from 'primeng/password';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [],

})
export class SignupComponent implements OnInit {
  @ViewChild(NgOtpInputComponent, { static: false }) ngOtpInput: NgOtpInputComponent;
  signupForm: FormGroup;
  otp: FormControl = new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
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
      phoneNumber: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern(/^\+?\d+$/)]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()_+|{}\[\]\\:";'<>?,./]{8,}$/)])
    })
  }

  signupUser() {
    validateAllFormFields(this.signupForm)
    if (!this.signupForm.valid) {
      return this.messageService.add({ severity: 'danger', summary: 'All fields are required.' });
    }
    const { value } = this.signupForm;
    this.authService.SignupUser(value).subscribe((res: any) => {
      if (res?.statusCode == 200) {
        this.messageService.add({ severity: 'success', summary: res?.message || 'Account registred successfully.' });
        const { phoneNumber } = this.signupForm.value
        this.router.navigate(['/auth/login'], { queryParams: { registered: phoneNumber } })
      }
    })
  }

  verifyOTP() {
    validateAllFormFields(this.otp)
    if (!this.otp.valid) {
      return this.messageService.add({ severity: 'danger', summary: 'OTP is required.' });
    }
    const { otp } = this.otp.value;
    const { phoneNumber } = this.signupForm.value;
    this.authService.VerifyOTP({
      otp,
      phoneNumber
    }).subscribe((res: any) => {
      if (res?.statusCode == 200) {
        this.messageService.add({ severity: 'success', summary: res?.message || 'Account registred successfully.' });
      }
    })
  }

  onOtpChange(event) {
    event.length == 6 ? this.otp.setValue(+event) : null
  }


}


