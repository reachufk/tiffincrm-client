import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IloggedUser } from 'src/app/shared/interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user: IloggedUser = JSON.parse(localStorage.getItem('loggedInUser'))
    if (this.authService.getLoggedInUserValue || user) {
      return true;
    }
    this.router.navigate(['/auth/login'], { queryParams: { state: JSON.stringify(state.url) } });
    return false;
  }

}

export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user: IloggedUser = JSON.parse(localStorage.getItem('loggedInUser'))
    if (user && user.role === 'admin') {
      return true;
    }
    this.router.navigate(['/auth/login'], { queryParams: { state: JSON.stringify(state.url) } });
    return false;
  }

}
