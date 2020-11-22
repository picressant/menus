import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekPageComponent } from "./pages/week-page/week-page.component";
import { IonicModule } from "@ionic/angular";
import { LayoutModule } from "../layout/layout.module";
import { SharedModule } from "../../shared/shared.module";
import { WeekMealCardComponent } from "./components/week-meal-card/week-meal-card.component";
import { ModifyMealPageComponent } from "./pages/modify-meal-page/modify-meal-page.component";
import { WeekSelectRecipeModalComponent } from "./components/week-select-recipe-modal/week-select-recipe-modal.component";
import { FormsModule } from "@angular/forms";
import { WeekSelectSideModalComponent } from "./components/week-select-side-modal/week-select-side-modal.component";


@NgModule({
    declarations: [
        WeekPageComponent,
        WeekMealCardComponent,
        ModifyMealPageComponent,
        WeekSelectRecipeModalComponent,
        WeekSelectSideModalComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        LayoutModule,

        SharedModule,
        FormsModule
    ],
    exports: [
        WeekPageComponent
    ]
})
export class WeekModule {
}
