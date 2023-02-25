import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser = this.authService.LoggedInUser?.value;
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${currentUser ? currentUser?.token : ''}`,
      },
    });
    return next.handle(request);
  }
}
