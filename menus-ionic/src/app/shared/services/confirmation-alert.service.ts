import { Injectable } from '@angular/core';
import { AlertController } from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class ConfirmationAlertService {

    constructor(
        private alertController: AlertController
    ) {
    }

    async confirm(text: string, onConfirm: Function) {
        const alert = await this.alertController.create({
            header: 'Confirmation',
            cssClass: 'confirmation-modal',
            message: text,
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                    cssClass: 'cancel'
                }, {
                    cssClass: 'confirmation',
                    text: 'Okay',
                    handler: () => {
                        onConfirm();
                    }
                }
            ]
        });

        await alert.present();
    }
}
