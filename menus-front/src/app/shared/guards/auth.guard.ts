import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, Observer } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.authenticationService.getToken();
    if (token) {
      if (this.authenticationService.user.getValue() == null) {
        return Observable.create((observer: Observer<boolean>) => {
          this.authenticationService.loadCurrentUser()
            .subscribe(res => {
              console.log('next user', res);
              this.authenticationService.user.next(res);
              observer.next(true);
              observer.complete();
            }, err => observer.error(err));
        });
      }
      else {
        return true;
      }
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
