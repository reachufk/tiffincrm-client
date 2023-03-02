import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './services/auth.service';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
import { NgOtpInputModule } from  'ng-otp-input';
import { MessageService } from 'primeng/api';
import {PasswordModule} from 'primeng/password';
import { PrimeNGShadowDOMDirective } from 'primeng-shadowdom-directives';

@NgModule({
  providers: [AuthService,MessageService],
  declarations: [
    LoginComponent,
    LogoutComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    NgOtpInputModule,
    PasswordModule,
    PrimeNGShadowDOMDirective
  ],
  exports: []
})
export class AuthModule { }
