import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared/shared.module";
import { SideListPageComponent } from "./pages/side-list-page/side-list-page.component";
import { SideItemPageComponent } from "./pages/side-item-page/side-item-page.component";
import { LayoutModule } from "../layout/layout.module";
import { IonicModule } from "@ionic/angular";


@NgModule({
    declarations: [
        SideListPageComponent,
        SideItemPageComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        LayoutModule,
        SharedModule
    ],
    exports: [
        SideListPageComponent,
        SideItemPageComponent
    ]
})
export class SidesModule {
}
