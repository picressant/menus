import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekShowComponent } from './week-show/week-show.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangeWeekMealDialogComponent } from './change-week-meal-dialog/change-week-meal-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [WeekShowComponent, ChangeWeekMealDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    WeekShowComponent
  ],
  entryComponents: [
    ChangeWeekMealDialogComponent
  ]
})
export class WeekModule { }
