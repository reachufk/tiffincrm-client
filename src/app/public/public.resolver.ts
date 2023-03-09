import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { IloggedUser } from '../shared/interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class PublicResolver implements Resolve<boolean> {
  constructor(private authService: AuthService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const user = JSON.parse(localStorage.getItem('loggedInUser'))
    return of(user)

  }
}
