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
  providers:[MessageService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    phoneNumber: new FormControl("6006014287", [Validators.required, Validators.minLength(10), Validators.maxLength(13)]),
    password: new FormControl('Asif.chap111', [Validators.required, Validators.minLength(8)])
  });
  OTPverificationForm: FormGroup
  showRegistrationForm: boolean = true;
  textList: string[] = [];
  showText: string;
  date: number = Date.now();
  error = ''
  hide: boolean = true;
  state: any;
  showPassword: boolean = false
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
      if(!this.state){
        this.router.navigate(['/public/home']);
        return
      }
      const decodedURL = decodeURIComponent(this.state);
      this.router.navigate([decodedURL])
    }
  }
}
