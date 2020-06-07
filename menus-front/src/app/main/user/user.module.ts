import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListPageComponent } from './pages/user-list-page/user-list-page.component';
import { UserItemPageComponent } from './pages/user-item-page/user-item-page.component';
import { SharedModule } from "../../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ResetPasswordDialogComponent } from "./components/reset-password-dialog/reset-password-dialog.component";
import { UserTableComponent } from './components/user-table/user-table.component';
import { GroupTableComponent } from './components/group-table/group-table.component';
import { GroupItemPageComponent } from './pages/group-item-page/group-item-page.component';

@NgModule({
  declarations: [
    UserListPageComponent,
    UserItemPageComponent,
    ResetPasswordDialogComponent,
    UserTableComponent,
    GroupTableComponent,
    GroupTableComponent,
    GroupItemPageComponent
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
