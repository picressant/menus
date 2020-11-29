import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroceriesListPageComponent } from "./pages/groceries-list-page/groceries-list-page.component";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "../../shared/shared.module";
import { LayoutModule } from "../layout/layout.module";
import { AddGroceriesInputComponent } from "./components/add-groceries-input/add-groceries-input.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AutoSizeInputModule } from "ngx-autosize-input";



@NgModule({
  declarations: [
      GroceriesListPageComponent,
      AddGroceriesInputComponent
  ],
    imports: [
        IonicModule,
        SharedModule,
        LayoutModule,
        CommonModule,
        ReactiveFormsModule,
        AutoSizeInputModule,
        FormsModule
    ],
  exports: [
      GroceriesListPageComponent
  ]
})
export class GroceriesModule { }
