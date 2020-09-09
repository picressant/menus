import { Injectable } from '@angular/core';
import { ToastController } from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class ToasterService {

    constructor(
        private toastController: ToastController
    ) {
    }

  async presentToastWithOptions(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      position: 'bottom',
      color: color,
      duration: 2000
    });
    toast.present();
  }

    info(text: string) {
      this.presentToastWithOptions(text, "dark")
        //this.toaster.info(text);
    }

    warning(text: string) {
      this.presentToastWithOptions(text, "warning")
    }

    error(text: string) {
      this.presentToastWithOptions(text, "danger")
    }
}
