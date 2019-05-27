import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRecetteComponent } from './search-recette/search-recette.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ShowRecetteComponent } from './show-recette/show-recette.component';
import { MaterialModule } from '../shared/material/material.module';
import { ShowIngredientsComponent } from './show-ingredients/show-ingredients.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SearchRecetteComponent, 
    ShowRecetteComponent, 
    ShowIngredientsComponent
  ],
  imports: [
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    SearchRecetteComponent
  ]
})
export class RecetteModule { }
