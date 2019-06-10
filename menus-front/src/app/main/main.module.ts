import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardModule } from './dashboard/dashboard.module';
import { RecipeModule } from './recipe/recipe.module';
import { SidedishModule } from './sidedish/sidedish.module';
import { WeekModule } from './week/week.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RecipeModule,
    DashboardModule,
    WeekModule
  ],
  exports: [
    RecipeModule,
    DashboardModule,
    SidedishModule,
    WeekModule
  ]
})
export class MainModule { }
