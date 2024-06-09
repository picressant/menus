import { Component, Input, OnInit } from '@angular/core';
import { UserRestService } from '@services/user-rest.service';
import { ToasterService } from '@services/toaster.service';
import { UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-reset-password-modal',
    templateUrl: './reset-password-modal.component.html',
    styleUrls: ['./reset-password-modal.component.scss'],
})
export class ResetPasswordModalComponent implements OnInit {

    form: UntypedFormGroup;

    @Input()
    private userId: string;

    ngOnInit(): void {
    }

    constructor(
        private formBuilder: UntypedFormBuilder,
        private toaster: ToasterService,
        private userService: UserRestService,
        private modalController: ModalController
    ) {
        this.form = this.formBuilder.group({
            password: [null, Validators.required],
            confirmation: [null, Validators.required],
        });

        this.form.setValidators(this._isSameAsNewPassword());
    }

    onSubmit() {
        this.userService.resetPassword(this.userId, this.form.value).subscribe(() => {
            this.toaster.info('Mot de passe modifié');
            this.closeModal();
        });
    }

    private _isSameAsNewPassword(): ValidatorFn {
        return (group: UntypedFormGroup): ValidationErrors => {
            const { password, confirmation } = group.controls;
            if (password.value !== confirmation.value) {
                confirmation.setErrors({ mismatch: true });
            }
            else {
                confirmation.setErrors(null);
            }
            return;
        };
    }

  closeModal() {
    this.modalController.dismiss();
  }
}
