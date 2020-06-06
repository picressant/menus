import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodAuthService } from '../services/food-auth.service';
import { ToasterService } from '../services/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authServiceA: FoodAuthService,
    private toasterA: ToasterService,
    private routerA: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const user = this.authServiceA.user.getValue();

    if (user.role.toString() === 'ROLE_ADMIN') {
      return true;
    }
    else {
      this.toasterA.error('Vous n\'êtes pas autorisé à accéder à cette page');
      this.routerA.navigate(['/main']);
      return false;
    }
  }

}
