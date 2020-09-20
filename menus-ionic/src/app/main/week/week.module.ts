import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekPageComponent } from "./pages/week-page/week-page.component";
import { IonicModule } from "@ionic/angular";
import { LayoutModule } from "../layout/layout.module";
import { SharedModule } from "../../shared/shared.module";
import { WeekGroceryListComponent } from "./components/week-grocery-list/week-grocery-list.component";
import { WeekMealCardComponent } from "./components/week-meal-card/week-meal-card.component";


@NgModule({
    declarations: [
        WeekPageComponent,
        WeekGroceryListComponent,
        WeekMealCardComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        LayoutModule,

        SharedModule
    ],
    exports: [
        WeekPageComponent
    ]
})
export class WeekModule {
}
