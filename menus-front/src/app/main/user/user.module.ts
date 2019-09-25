import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListPageComponent } from './pages/user-list-page/user-list-page.component';
import { UserItemPageComponent } from './pages/user-item-page/user-item-page.component';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { SharedModule } from "../../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    UserListPageComponent,
    UserItemPageComponent,
    UserAvatarComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    UserListPageComponent,
    UserItemPageComponent
  ]
})
export class UserModule {
}
