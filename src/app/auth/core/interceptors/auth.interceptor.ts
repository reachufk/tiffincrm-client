import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IloggedUser } from 'src/app/shared/interfaces/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  loggedUser: IloggedUser = JSON.parse(localStorage.getItem('loggedInUser'))
  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loggedUser = this.authService.getLoggedInUserValue
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.loggedUser ? this.loggedUser?.token : ''}`,
      },
    });
    return next.handle(request);
  }
}
