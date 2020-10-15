import { Component, OnInit } from '@angular/core';
import { AbstractItemPage } from "../../../../shared/pages/abstract-item-page";
import { User } from "@models/user.model";
import { getAllRoles, Role, getRoleStringified } from "@models/role.enum";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FoodAuthService } from "@services/food-auth.service";
import { ToasterService } from "@services/toaster.service";
import { forkJoin, Observable } from "rxjs";
import { UserRestService } from "@services/user-rest.service";

@Component({
  selector: 'app-user-item-page',
  templateUrl: './user-item-page.component.html',
  styleUrls: ['./user-item-page.component.scss'],
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
      private authService: FoodAuthService,
      private toaster: ToasterService,
      private router: Router
  ) {
    super(route, toaster, 'Utilisateur sauvegardé avec succès', 'Utilisateur créé avec succès');
    this.form = User.form(this.fb);

    this.roles = getAllRoles();
  }

  // public resetPassword() {
  //   const dialogRef = this.dialog.open(ResetPasswordDialogComponent, {
  //     data: this.form.value
  //   });
  // }
  isFromMenu: boolean = true;

  timestamp: string;

  get title() {
    if (this.isAddingMode)
      return "Ajouter un utilisateur";
    else
      return this.form.value.firstname + " " + this.form.value.lastname;
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
