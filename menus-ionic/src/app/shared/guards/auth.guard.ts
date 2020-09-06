import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { FoodAuthService } from '../services/food-auth.service';
import { Observable, Observer } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: FoodAuthService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("can activate auth");
    const token = this.authenticationService.getToken();
    if (token) {
      if (this.authenticationService.user.getValue() == null) {
        return Observable.create((observer: Observer<boolean>) => {
          this.authenticationService.loadCurrentUser()
            .subscribe(res => {
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
