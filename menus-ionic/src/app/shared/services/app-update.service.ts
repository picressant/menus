import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AlertController } from "@ionic/angular";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AppUpdateService {
    constructor(
        private readonly updates: SwUpdate,
        private alertController: AlertController) {

        if (environment.production) {
            this.updates.available.subscribe(event => {
                this.showAppUpdateAlert();
            });

            this.updates.checkForUpdate();
        }
    }

    async showAppUpdateAlert() {
        const alert = await this.alertController.create({
            header: 'Mise à jour',
            backdropDismiss: false,
            message: 'Une mise à jour est disponible, la page doit être rechargée',
            buttons: [
                {
                    cssClass: 'color-dark',
                    text: 'Ok',
                    handler: () => {
                        this.doAppUpdate();
                    }
                }
            ]
        });

        await alert.present();
    }

    doAppUpdate() {
        this.updates.activateUpdate().then(() => document.location.reload());
    }
}
