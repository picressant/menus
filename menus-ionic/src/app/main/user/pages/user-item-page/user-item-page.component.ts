import { Component, OnInit } from '@angular/core';
import { AbstractItemPage } from "../../../../shared/pages/abstract-item-page";
import { User } from "@models/user.model";
import { getAllRoles, getRoleStringified, Role } from "@models/role.enum";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FoodAuthService } from "@services/food-auth.service";
import { ToasterService } from "@services/toaster.service";
import { EMPTY, forkJoin, Observable } from "rxjs";
import { UserRestService } from "@services/user-rest.service";
import { ModalController } from "@ionic/angular";
import { GroupSelectorModalComponent } from "../../components/group-selector-modal/group-selector-modal.component";
import { ResetPasswordModalComponent } from "../../components/reset-password-modal/reset-password-modal.component";
import { getAllPrivileges, Privilege } from "@models/privilege.enum";

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

    privileges: string[] = [];

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private userService: UserRestService,
        private authService: FoodAuthService,
        private toaster: ToasterService,
        private router: Router,
        private modalController: ModalController
    ) {
        super(route, toaster, 'Utilisateur sauvegardé avec succès', 'Utilisateur créé avec succès');
        this.form = User.form(this.fb);

        this.roles = getAllRoles();
        this.privileges = getAllPrivileges();
    }

    isFromMenu: boolean = true;

    timestamp: string;

    ngOnInit() {
        super.ngOnInit();

        this.route.queryParams.subscribe(params => {
            if (params.isFromList)
                this.isFromMenu = false;
        });
    }

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

    postPrivileges() {
        this.userService.setPrivileges(this.form.value, this.privileges).subscribe();
    }

    postCreate() {
        if (this.imgPreviewURL != null) {
            this.userService.storeAvatar(this.id, this.storeCurrentImages[0]).subscribe(() => {
                this.timestamp = new Date().getTime().toString();
                this.imgPreviewURL = null;
                this.storeCurrentImages = null;
            });
        }
    }

    private _saveData() {
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
        }
        else {
            this.save$.subscribe(user => {
                    this.resetForm(user);

                    if (this.authService.user.getValue().id === this.id) {
                        this.authService.user.next(user);
                    }

                    this.toaster.info('Utilisateur sauvegardé avec succès');
                }
            );
        }
    }

    _save() {
        if (this.authService.user.getValue().privileges.indexOf(Privilege.MANAGE_USERS))
            this.userService.setPrivileges(this.form.value, this.form.controls.privileges.value).subscribe(() => this._saveData());
        else
            this._saveData();
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

    async chooseGroup() {
        if (this.authService.user.getValue().role === Role.ROLE_ADMIN) {
            const modal = await this.modalController.create({
                component: GroupSelectorModalComponent
            });

            await modal.present();

            const { data } = await modal.onWillDismiss();
            if (data && data.group) {
                this.form.controls.group.setValue(data.group);
            }
        }
    }

    async resetPassword() {
        if (!this.isReadonly) {
            const modal = await this.modalController.create({
                component: ResetPasswordModalComponent,
                componentProps: {
                    userId: this.id
                }
            });

            await modal.present();
        }
    }
}
