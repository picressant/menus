import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeModule } from './recipe/recipe.module';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RecipeModule,
    DashboardModule
  ],
  exports: [
    RecipeModule,
    DashboardModule
  ]
})
export class MainModule { }
