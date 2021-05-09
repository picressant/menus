import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientsPageComponent } from "./pages/ingredients-page/ingredients-page.component";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "../../shared/shared.module";
import { LayoutModule } from "../layout/layout.module";
import { ReactiveFormsModule } from "@angular/forms";



@NgModule({
  declarations: [
      IngredientsPageComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    LayoutModule,
    ReactiveFormsModule
  ]
})
export class IngredientsModule { }
