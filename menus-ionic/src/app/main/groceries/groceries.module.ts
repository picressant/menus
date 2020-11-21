import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroceriesListPageComponent } from "./pages/groceries-list-page/groceries-list-page.component";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "../../shared/shared.module";
import { LayoutModule } from "../layout/layout.module";
import { OptionPopoverComponent } from "./components/option-popover/option-popover.component";
import { AddGroceriesInputComponent } from "./components/add-groceries-input/add-groceries-input.component";
import { ReactiveFormsModule } from "@angular/forms";



@NgModule({
  declarations: [
      GroceriesListPageComponent,
      OptionPopoverComponent,
      AddGroceriesInputComponent
  ],
    imports: [
        IonicModule,
        SharedModule,
        LayoutModule,
        CommonModule,
        ReactiveFormsModule
    ],
  exports: [
      GroceriesListPageComponent
  ]
})
export class GroceriesModule { }
