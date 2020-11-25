import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingImgComponent } from "@components/loading/loading-img/loading-img.component";
import { SecurePipe } from "./pipes/secure.pipe";
import { IonicModule } from "@ionic/angular";
import { LayoutModule } from "../main/layout/layout.module";
import { IngredientModalSelectorComponent } from "@components/selectors/ingredient-modal-selector/ingredient-modal-selector.component";
import { FooterTabComponent } from "@components/layout/footer-tab/footer-tab.component";
import { IngredientsQuantityListComponent } from "@components/lists/ingredients-quantity-list/ingredients-quantity-list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AutoSizeInputModule } from "ngx-autosize-input";
import { RecipeListComponent } from "@components/lists/recipe-list/recipe-list.component";
import { RecipeItemCardComponent } from "@components/cards/recipe-item-card/recipe-item-card.component";
import { LongPressDirective } from "./directives/long-press.directive";
import { SideListComponent } from "@components/lists/side-list/side-list.component";
import { HasRoleDirective } from "./directives/has-role.directive";
import { IngredientListComponent } from "@components/lists/ingredient-list/ingredient-list.component";
import { HasPrivilegeDirective } from "./directives/has-privilege.directive";
import { UnitModalComponent } from "../main/parameters/components/unit-modal/unit-modal.component";
import { IngredientModalComponent } from "@components/modals/ingredient-modal/ingredient-modal.component";
import { OptionPopoverComponent } from "@components/popover/option-popover/option-popover.component";
import { RecipeCardAvatarComponent } from "@components/cards/recipe-card-avatar/recipe-card-avatar.component";


@NgModule({
    declarations: [
        LoadingImgComponent,
        SecurePipe,
        IngredientModalSelectorComponent,
        FooterTabComponent,
        IngredientsQuantityListComponent,
        RecipeListComponent,
        RecipeItemCardComponent,
        SideListComponent,
        IngredientListComponent,
        OptionPopoverComponent,

        UnitModalComponent,
        IngredientModalComponent,

        LongPressDirective,
        HasRoleDirective,
        HasPrivilegeDirective,
        RecipeCardAvatarComponent
    ],
    imports: [
        CommonModule,
        IonicModule,
        LayoutModule,

        FormsModule,
        AutoSizeInputModule,
        ReactiveFormsModule
    ],
    exports: [
        LoadingImgComponent,
        SecurePipe,
        FooterTabComponent,
        IngredientsQuantityListComponent,
        RecipeListComponent,
        SideListComponent,
        IngredientListComponent,
        OptionPopoverComponent,

        UnitModalComponent,
        IngredientModalComponent,

        LongPressDirective,
        HasRoleDirective,
        HasPrivilegeDirective,
        RecipeCardAvatarComponent
    ]
})
export class SharedModule {
}
