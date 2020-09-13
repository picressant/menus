import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekPageComponent } from "./pages/week-page/week-page.component";
import { IonicModule } from "@ionic/angular";
import { LayoutModule } from "../layout/layout.module";


@NgModule({
    declarations: [
        WeekPageComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        LayoutModule
    ],
    exports: [
        WeekPageComponent
    ]
})
export class WeekModule {
}
