import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekMenusComponent } from './week-menus/week-menus.component';
import { MaterialModule } from '../shared/material/material.module';
import { WeekMenusSearchDialogComponent } from './week-menus/week-menus-search-dialog/week-menus-search-dialog.component';
import { RecetteModule } from '../recette/recette.module';
import { WeekMenusV2Component } from './week-menus-v2/week-menus-v2.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [WeekMenusComponent, WeekMenusSearchDialogComponent, WeekMenusV2Component],
  imports: [
    SharedModule,
    RecetteModule
  ],
  entryComponents: [
    WeekMenusSearchDialogComponent
  ]
})
export class MenusModule { }
