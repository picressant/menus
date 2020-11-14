import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../shared/shared.module";
import { ParametersPageComponent } from "./pages/parameters-page/parameters-page.component";
import { IonicModule } from "@ionic/angular";
import { LayoutModule } from "../layout/layout.module";
import { UnitListComponent } from "./components/unit-list/unit-list.component";
import { UnitModalComponent } from "./components/unit-modal/unit-modal.component";
import { ReactiveFormsModule } from "@angular/forms";
import { IngredientModalComponent } from "./components/ingredient-modal/ingredient-modal.component";
import { SelectUnitModalComponent } from "./components/select-unit-modal/select-unit-modal.component";
import { ShopSectionListComponent } from "./components/shop-section-list/shop-section-list.component";
import { ShopSectionModalComponent } from "./components/shop-section-modal/shop-section-modal.component";


@NgModule({
    declarations: [
        ParametersPageComponent,
        UnitListComponent,
        UnitModalComponent,
        IngredientModalComponent,
        SelectUnitModalComponent,
        ShopSectionListComponent,
        ShopSectionModalComponent
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
