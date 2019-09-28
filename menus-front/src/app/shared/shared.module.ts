import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormFieldWrapperComponent } from './components/inputs/form-field-wrapper/form-field-wrapper.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [FormFieldWrapperComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FormFieldWrapperComponent
  ]
})
export class SharedModule {
}
