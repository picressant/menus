import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingImgComponent } from "@components/loading/loading-img/loading-img.component";
import { SecurePipe } from "./pipes/secure.pipe";
import { IonicModule } from "@ionic/angular";
import { LayoutModule } from "../main/layout/layout.module";
import { IngredientModalSelectorComponent } from "@components/selectors/ingredient-modal-selector/ingredient-modal-selector.component";
import { FooterTabComponent } from "@components/layout/footer-tab/footer-tab.component";
import { IngredientsQuantityListComponent } from "@components/lists/ingredients-quantity-list/ingredients-quantity-list.component";
import { FormsModule } from "@angular/forms";
import { AutoSizeInputModule } from "ngx-autosize-input";
import { RecipeListComponent } from "@components/lists/recipe-list/recipe-list.component";
import { RecipeItemCardComponent } from "@components/cards/recipe-item-card/recipe-item-card.component";
import { LongPressDirective } from "./directives/long-press.directive";


@NgModule({
    declarations: [
        LoadingImgComponent,
        SecurePipe,
        IngredientModalSelectorComponent,
        FooterTabComponent,
        IngredientsQuantityListComponent,
        RecipeListComponent,
        RecipeItemCardComponent,

        LongPressDirective
    ],
    imports: [
        CommonModule,
        IonicModule,
        LayoutModule,

        FormsModule,
        AutoSizeInputModule
    ],
    exports: [
        LoadingImgComponent,
        SecurePipe,
        FooterTabComponent,
        IngredientsQuantityListComponent,
        RecipeListComponent,

        LongPressDirective
    ]
})
export class SharedModule {
}
