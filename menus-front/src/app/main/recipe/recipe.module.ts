import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecipeShowComponent } from './recipe-show/recipe-show.component';

@NgModule({
  declarations: [
    RecipeSearchComponent,
    RecipeShowComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    RecipeSearchComponent,
    RecipeShowComponent
  ]
})
export class RecipeModule { }
