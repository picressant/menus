import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AlertController } from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class AppUpdateService {
    constructor(
        private readonly updates: SwUpdate,
        private alertController: AlertController) {

        this.updates.available.subscribe(event => {
            this.showAppUpdateAlert();
        });

        this.updates.checkForUpdate();
    }

    async showAppUpdateAlert() {
        const alert = await this.alertController.create({
            header: 'Mise à jour',
            cssClass: 'confirmation-modal',
            message: 'Une mise à jour est disponible. Recharger la page ?',
            buttons: [
                {
                    text: 'Ignorer',
                    role: 'cancel',
                    cssClass: 'cancel'
                }, {
                    cssClass: 'confirmation',
                    text: 'Okay',
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
