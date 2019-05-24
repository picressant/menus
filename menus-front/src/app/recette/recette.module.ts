import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRecetteComponent } from './search-recette/search-recette.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ShowRecetteComponent } from './show-recette/show-recette.component';
import { MaterialModule } from '../material/material.module';
import { ShowIngredientsComponent } from './show-ingredients/show-ingredients.component';

@NgModule({
  declarations: [
    SearchRecetteComponent, 
    ShowRecetteComponent, ShowIngredientsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    SearchRecetteComponent
  ]
})
export class RecetteModule { }
