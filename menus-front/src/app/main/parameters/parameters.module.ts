import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParametersManagementComponent } from './parameters-management/parameters-management.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddIngredientDialogComponent } from './add-ingredient-dialog/add-ingredient-dialog.component';
import { AddUnitDialogComponent } from './add-unit-dialog/add-unit-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ParametersManagementComponent,
    AddIngredientDialogComponent,
    AddUnitDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ParametersManagementComponent
  ],
  entryComponents: [
    AddUnitDialogComponent,
    AddIngredientDialogComponent
  ]
})
export class ParametersModule { }
