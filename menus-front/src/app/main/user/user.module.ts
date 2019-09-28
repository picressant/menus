import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListPageComponent } from './pages/user-list-page/user-list-page.component';
import { UserItemPageComponent } from './pages/user-item-page/user-item-page.component';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { SharedModule } from "../../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ResetPasswordDialogComponent } from "./components/reset-password-dialog/reset-password-dialog.component";

@NgModule({
  declarations: [
    UserListPageComponent,
    UserItemPageComponent,
    UserAvatarComponent,
    ResetPasswordDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    UserListPageComponent,
    UserItemPageComponent
  ],
  entryComponents: [
    ResetPasswordDialogComponent
  ]
})
export class UserModule {
}
