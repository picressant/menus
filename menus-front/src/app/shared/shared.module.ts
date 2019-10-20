import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormFieldWrapperComponent } from './components/inputs/form-field-wrapper/form-field-wrapper.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConfirmationModalComponent } from "./components/modals/confirmation-modal/confirmation-modal.component";
import { SecurePipe } from "./pipes/secure.pipe";
import { LoadingImgComponent } from "./components/loading/loading-img/loading-img.component";
import { HasRoleDirective } from "./directives/has-role.directive";
import { TableHeaderComponent } from './components/table/table-header/table-header.component';
import { UnitSelectorComponent } from './components/selectors/unit-selector/unit-selector.component';
import { NgSelectModule } from "@ng-select/ng-select";
import { IngredientSelectorComponent } from './components/selectors/ingredient-selector/ingredient-selector.component';
import { RecipeSelectorComponent } from './components/selectors/recipe-selector/recipe-selector.component';
import { SidedishSelectorComponent } from './components/selectors/sidedish-selector/sidedish-selector.component';

@NgModule({
  declarations: [
    FormFieldWrapperComponent,
    ConfirmationModalComponent,
    SecurePipe,
    LoadingImgComponent,
    HasRoleDirective,
    TableHeaderComponent,
    UnitSelectorComponent,
    UnitSelectorComponent,
    IngredientSelectorComponent,
    RecipeSelectorComponent,
    SidedishSelectorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule
  ],
  entryComponents: [
    ConfirmationModalComponent
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FormFieldWrapperComponent,
    SecurePipe,
    LoadingImgComponent,
    HasRoleDirective,
    TableHeaderComponent,
    UnitSelectorComponent,
    IngredientSelectorComponent,
    RecipeSelectorComponent,
    SidedishSelectorComponent
  ]
})
export class SharedModule {
}
