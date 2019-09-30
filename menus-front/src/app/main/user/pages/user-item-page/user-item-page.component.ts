import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { User } from "../../../../shared/models/user.model";
import { ActivatedRoute, Router } from "@angular/router";
import { UserRestService } from "../../../services/user-rest.service";
import { AbstractItemPage } from "../../../../shared/components/pages/abstract-item-page";
import { ToasterService } from "../../../../shared/services/toaster.service";
import { forkJoin, Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ResetPasswordDialogComponent } from "../../components/reset-password-dialog/reset-password-dialog.component";
import { AuthService } from "../../../../shared/services/auth.service";
import { getAllRoles, getRoleStringified, Role } from "../../../../shared/models/role.enum";

@Component({
  selector: 'menus-user-item-page',
  templateUrl: './user-item-page.component.html',
  styleUrls: ['./user-item-page.component.less']
})
export class UserItemPageComponent extends AbstractItemPage<User> implements OnInit {

  fileUploadError = '';
  imgPreviewURL: any;
  storeCurrentImages: any;

  roles: Role[] = [];

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

    this.roles = getAllRoles();
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

  postCreate() {
    if (this.imgPreviewURL != null) {
      this.userService.storeAvatar(this.id, this.storeCurrentImages[0]).subscribe();
      this.imgPreviewURL = null;
      this.storeCurrentImages = null;
    }
  }

  _save() {
    if (this.imgPreviewURL != null) {
      forkJoin([
        this.userService.storeAvatar(this.id, this.storeCurrentImages[0]),
        this.save$
      ]).subscribe(([res, user]) => {
        this.imgPreviewURL = null;
        this.storeCurrentImages = null;
        this.toaster.info('Utilisateur sauvegardé avec succès');
        this.resetForm(user);

        if (this.authService.user.getValue().id === this.id) {
          this.authService.user.next(user);
        }
      });
    } else {
      this.save$.subscribe(
        (user: User) => {
          this.resetForm(user);

          if (this.authService.user.getValue().id === this.id) {
            this.authService.user.next(user);
          }

          this.toaster.info('Utilisateur sauvegardé avec succès');
        }
      );
    }
  }

  get imgStyles() {
    return {
      width: '200px',
      height: '200px',
      'border-radius': '10px',
      'object-fit': 'cover'
    };
  }

  preview(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.fileUploadError = 'Le fichier doit être une image';
      return;
    }

    const reader = new FileReader();
    this.storeCurrentImages = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgPreviewURL = reader.result;
    };
  }

  getRoleStringified(role: Role) {
    return getRoleStringified(role);
  }
}
