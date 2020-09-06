import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekPageComponent } from "./pages/week-page/week-page.component";
import { IonicModule } from "@ionic/angular";


@NgModule({
    declarations: [
        WeekPageComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        WeekPageComponent
    ]
})
export class WeekModule {
}
