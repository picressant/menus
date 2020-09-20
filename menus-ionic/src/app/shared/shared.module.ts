import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingImgComponent } from "./components/loading/loading-img/loading-img.component";
import { SecurePipe } from "./pipes/secure.pipe";
import { IonicModule } from "@ionic/angular";
import { LayoutModule } from "../main/layout/layout.module";
import { IngredientModalSelectorComponent } from "./components/selectors/ingredient-modal-selector/ingredient-modal-selector.component";
import { FooterTabComponent } from "./components/layout/footer-tab/footer-tab.component";


@NgModule({
    declarations: [
        LoadingImgComponent,
        SecurePipe,
        IngredientModalSelectorComponent,
        FooterTabComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        LayoutModule
    ],
    exports: [
        LoadingImgComponent,
        SecurePipe,
        FooterTabComponent
    ]
})
export class SharedModule {
}
