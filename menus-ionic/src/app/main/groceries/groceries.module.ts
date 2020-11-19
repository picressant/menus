import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroceriesListPageComponent } from "./pages/groceries-list-page/groceries-list-page.component";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "../../shared/shared.module";
import { LayoutModule } from "../layout/layout.module";
import { OptionPopoverComponent } from "./components/option-popover/option-popover.component";



@NgModule({
  declarations: [
      GroceriesListPageComponent,
      OptionPopoverComponent,
  ],
    imports: [
        IonicModule,
        SharedModule,
        LayoutModule,
        CommonModule
    ],
  exports: [
      GroceriesListPageComponent
  ]
})
export class GroceriesModule { }
