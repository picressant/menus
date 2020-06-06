import { Injectable } from '@angular/core';
import { ToasterService } from './toaster.service';
import { FoodAuthService } from "./food-auth.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private toaster: ToasterService,
    private authService: FoodAuthService) {
  }

  manageError(error: any) {
    if (error !== null) {
      if (error.message === 'token expired') {
        this.toaster.warning('Votre session a expirée. Merci de vous reconnecter.');
        this.authService.logout();
      }
      else if (error.message) {
        this.toaster.error(error.message);
      }
    }
    else {
      this.toaster.error('Une erreur est survenue');
      // console.log(error.e);
    }
  }
}
