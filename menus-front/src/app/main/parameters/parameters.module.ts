import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametersManagementPageComponent } from './pages/parameters-management-page/parameters-management-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddIngredientDialogComponent } from './components/add-ingredient-dialog/add-ingredient-dialog.component';
import { AddUnitDialogComponent } from './components/add-unit-dialog/add-unit-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnitTableComponent } from './components/unit-table/unit-table.component';

@NgModule({
  declarations: [
    ParametersManagementPageComponent,
    AddIngredientDialogComponent,
    AddUnitDialogComponent,
    UnitTableComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ParametersManagementPageComponent
  ],
  entryComponents: [
    AddUnitDialogComponent,
    AddIngredientDialogComponent
  ]
})
export class ParametersModule { }
