import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { WeekPageComponent } from './pages/week-page/week-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChangeWeekMealDialogComponent } from './components/change-week-meal-dialog/change-week-meal-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WeekGroceryListComponent } from './components/week-grocery-list/week-grocery-list.component';

@NgModule({
  declarations: [WeekPageComponent, ChangeWeekMealDialogComponent, WeekGroceryListComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  exports: [
    WeekPageComponent
  ],
  entryComponents: [
    ChangeWeekMealDialogComponent
  ]
})
export class WeekModule { }
