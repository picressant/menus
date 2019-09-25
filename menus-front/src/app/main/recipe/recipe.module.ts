import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecipeListPageComponent } from './pages/recipe-list-page/recipe-list-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeItemPageComponent } from './pages/recipe-item-page/recipe-item-page.component';
import { AddIngredientDialogComponent } from './components/add-ingredient-dialog/add-ingredient-dialog.component';
import { RecipeItemCardComponent } from './components/recipe-item-card/recipe-item-card.component';

@NgModule({
  declarations: [
    RecipeListPageComponent,
    RecipeItemPageComponent,
    AddIngredientDialogComponent,
    RecipeItemCardComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    RecipeListPageComponent,
    RecipeItemPageComponent
  ],
  entryComponents: [
    AddIngredientDialogComponent
  ]
})
export class RecipeModule {
}
