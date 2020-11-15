import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodAuthService } from '@services/food-auth.service';
import { PrivilegeGuard } from './privilege-guard.service';

@Injectable({
    providedIn: 'root'
})
export class PrivilegeOrSelfGuard extends PrivilegeGuard implements CanActivate {

    constructor(
        private authService: FoodAuthService,
        private router: Router
    ) {
        super(authService, router);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        const id = route.params.id;
        const user = this.authService.user.getValue();

        if (user.id === id) {
            return true;
        }
        else {
            return super.canActivate(route, state);
        }
    }
}
