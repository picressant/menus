import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserItemPageComponent } from "./pages/user-item-page/user-item-page.component";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "../../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { GroupListComponent } from "./components/group-list/group-list.component";
import { GroupSelectorModalComponent } from "./components/group-selector-modal/group-selector-modal.component";
import { ResetPasswordModalComponent } from "./components/reset-password-modal/reset-password-modal.component";


@NgModule({
    declarations: [
        UserItemPageComponent,
        GroupListComponent,
        GroupSelectorModalComponent,
        ResetPasswordModalComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        SharedModule,
        ReactiveFormsModule
    ],
    exports: [
        UserItemPageComponent
    ]
})
export class UserModule {
}
