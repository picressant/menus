import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { User } from "../../../../shared/models/user.model";
import { ActivatedRoute, Router } from "@angular/router";
import { UserRestService } from "../../../services/user-rest.service";
import { AbstractItemPage } from "../../../../shared/components/pages/abstract-item-page";
import { ToasterService } from "../../../../shared/services/toaster.service";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ResetPasswordDialogComponent } from "../../components/reset-password-dialog/reset-password-dialog.component";
import { AuthService } from "../../../../shared/services/auth.service";

@Component({
  selector: 'menus-user-item-page',
  templateUrl: './user-item-page.component.html',
  styleUrls: ['./user-item-page.component.less']
})
export class UserItemPageComponent extends AbstractItemPage<User> implements OnInit {

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserRestService,
    private authService: AuthService,
    private toaster: ToasterService,
    private router: Router,
    private dialog: MatDialog,
  ) {
    super(route, toaster, 'Utilisateur sauvegardé avec succès', 'Utilisateur créé avec succès');
    this.form = User.form(this.fb);
  }

  public resetPassword() {
    const dialogRef = this.dialog.open(ResetPasswordDialogComponent, {
      data: this.form.value
    });
  }

  get create$(): Observable<User> {
    return this.userService.saveUser(this.form.value);
  }

  get get$(): Observable<User> {
    return this.userService.getUser(this.id);
  }

  onCancelAdd() {
    this.router.navigate(['/main/user'])
  }

  get save$(): Observable<User> {
    return this.userService.saveUser(this.form.value);
  }

  _save() {
    this.save$.subscribe(
      (user: User) => {
        this.resetForm(user);

        if (this.authService.user.getValue().id === this.id) {
          this.authService.user.next(user);
        }

        this.toaster.info(this.saveToast);
      }
    );
  }
}
