import { NgModule } from '@angular/core';
import { RecipeListPageComponent } from "./pages/recipe-list-page/recipe-list-page.component";
import { RecipeItemCardComponent } from "../../shared/components/cards/recipe-item-card/recipe-item-card.component";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { RecipeItemPageComponent } from "./pages/recipe-item-page/recipe-item-page.component";
import { SharedModule } from "../../shared/shared.module";
import { LayoutModule } from "../layout/layout.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AutoSizeInputModule } from "ngx-autosize-input";

@NgModule({
    declarations: [
        RecipeListPageComponent,
        RecipeItemPageComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        SharedModule,
        LayoutModule,
        AutoSizeInputModule,

        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        RecipeListPageComponent
    ]
})
export class RecipeModule {
}
