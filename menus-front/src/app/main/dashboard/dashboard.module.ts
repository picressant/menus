import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DashboardNextMealComponent } from './components/dashboard-next-meal/dashboard-next-meal.component';

@NgModule({
  declarations: [DashboardComponent, DashboardNextMealComponent],
  imports: [
    CommonModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
