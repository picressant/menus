import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserItemPageComponent } from "./pages/user-item-page/user-item-page.component";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "../../shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";



@NgModule({
  declarations: [
      UserItemPageComponent
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
export class UserModule { }
