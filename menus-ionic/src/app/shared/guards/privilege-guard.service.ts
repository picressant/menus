import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodAuthService } from '../services/food-auth.service';

//import { ToasterService } from '../services/toaster.service';

@Injectable({
    providedIn: 'root'
})
export class PrivilegeGuard implements CanActivate {

    constructor(
        private authServiceA: FoodAuthService,
        private routerA: Router
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        const user = this.authServiceA.user.getValue();
        const privilege = next.data.privilege;

        if (user.privileges.indexOf(privilege) >= 0) {
            return true;
        }
        else {
            this.routerA.navigate(['/main']);
            return false;
        }
    }

}
