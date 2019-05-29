import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecipeShowComponent } from './recipe-show/recipe-show.component';
import { AddIngredientDialogComponent } from './recipe-show/add-ingredient-dialog/add-ingredient-dialog.component';

@NgModule({
  declarations: [
    RecipeSearchComponent,
    RecipeShowComponent,
    AddIngredientDialogComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    RecipeSearchComponent,
    RecipeShowComponent
  ],
  entryComponents: [
    AddIngredientDialogComponent
  ]
})
export class RecipeModule { }
