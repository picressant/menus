import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CombinedGuard implements CanActivate {

  constructor(private injector: Injector) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const guards = route.data.guards || [];

    for (const guard of guards) {
      const instance: CanActivate = this.injector.get(guard);
      let result = await instance.canActivate(route, state);
      if (result instanceof Observable) {
        result = await result.toPromise();
      }
      if (result === false || result instanceof UrlTree) {
        return result;
      }
    }
    return true;
  }
}
