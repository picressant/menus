import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserItemPageComponent } from "./pages/user-item-page/user-item-page.component";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "../../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { GroupListComponent } from "./components/group-list/group-list.component";
import { GroupSelectorModalComponent } from "./components/group-selector-modal/group-selector-modal.component";
import { ResetPasswordModalComponent } from "./components/reset-password-modal/reset-password-modal.component";
import { UserListPageComponent } from "./pages/user-list-page/user-list-page.component";
import { LayoutModule } from "../layout/layout.module";
import { UserListComponent } from "./components/user-list/user-list.component";
import { GroupItemPageComponent } from "./pages/group-item-page/group-item-page.component";


@NgModule({
    declarations: [
        UserItemPageComponent,
        GroupListComponent,
        GroupSelectorModalComponent,
        GroupItemPageComponent,
        ResetPasswordModalComponent,
        UserListPageComponent,
        UserListComponent
    ],
    imports: [
        CommonModule,
        LayoutModule,
        IonicModule,
        SharedModule,
        ReactiveFormsModule
    ],
    exports: [
        UserItemPageComponent,
        UserListPageComponent,
        GroupItemPageComponent
    ]
})
export class UserModule {
}
