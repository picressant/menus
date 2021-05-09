import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared/shared.module";
import { ParametersPageComponent } from "./pages/parameters-page/parameters-page.component";
import { IonicModule } from "@ionic/angular";
import { LayoutModule } from "../layout/layout.module";
import { UnitListComponent } from "./components/unit-list/unit-list.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SelectUnitModalComponent } from "@components/modals/select-unit-modal/select-unit-modal.component";
import { ShopSectionListComponent } from "./components/shop-section-list/shop-section-list.component";
import { ShopSectionModalComponent } from "./components/shop-section-modal/shop-section-modal.component";
import { ConversionListComponent } from "./components/conversion-list/conversion-list.component";
import { ConversionModalComponent } from "./components/conversion-modal/conversion-modal.component";


@NgModule({
    declarations: [
        ParametersPageComponent,
        UnitListComponent,
        SelectUnitModalComponent,
        ShopSectionListComponent,
        ShopSectionModalComponent,
        ConversionListComponent,
        ConversionModalComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        SharedModule,
        LayoutModule,
        ReactiveFormsModule
    ],
    exports: [
        ParametersPageComponent
    ]
})
export class ParametersModule {
}
