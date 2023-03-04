import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        console.log(err)
        if (err.status === 403) {
          localStorage.removeItem('loggedInUser')
          this.router.navigate(['/auth/login'])
        }
        const error = err?.error?.message || err?.statusText;
        return throwError(error);
      })
    );
  }
}
