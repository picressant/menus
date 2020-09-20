import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekPageComponent } from "./pages/week-page/week-page.component";
import { IonicModule } from "@ionic/angular";
import { LayoutModule } from "../layout/layout.module";
import { SharedModule } from "../../shared/shared.module";


@NgModule({
    declarations: [
        WeekPageComponent
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
