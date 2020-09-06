import { NgModule } from '@angular/core';
import { RecipeListPageComponent } from "./pages/recipe-list-page/recipe-list-page.component";
import { RecipeItemCardComponent } from "./components/recipe-item-card/recipe-item-card.component";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { RecipeItemPageComponent } from "./pages/recipe-item-page/recipe-item-page.component";
import { SharedModule } from "../../shared/shared.module";


@NgModule({
    declarations: [
        RecipeListPageComponent,
        RecipeItemCardComponent,
        RecipeItemPageComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        SharedModule
    ],
    exports: [
        RecipeListPageComponent,
        RecipeItemPageComponent
    ]
})
export class RecipeModule {
}
