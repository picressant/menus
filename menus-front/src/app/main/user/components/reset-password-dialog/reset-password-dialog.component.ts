import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Ingredient } from '../../../../shared/models/ingredient.model';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToasterService } from "../../../../shared/services/toaster.service";
import { UserRestService } from "../../../services/user-rest.service";
import { User } from "../../../../shared/models/user.model";

@Component({
  selector: 'menus-reset-password-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.less']
})
export class ResetPasswordDialogComponent implements OnInit {

  form: FormGroup;

  ngOnInit(): void {
  }

  constructor(
    public dialogRef: MatDialogRef<ResetPasswordDialogComponent>,
    private formBuilder: FormBuilder,
    private toaster: ToasterService,
    private userService: UserRestService,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {
    this.form = this.formBuilder.group({
      password: [null, Validators.required],
      confirmation: [null, Validators.required],
    });

    this.form.setValidators(this._isSameAsNewPassword());
  }

  onSubmit() {
    this.userService.resetPassword(this.data.id, this.form.value).subscribe(() => {
      this.toaster.info("Mot de passe modifié");
      this.dialogRef.close();
    });
  }

  private _isSameAsNewPassword(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
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
}
