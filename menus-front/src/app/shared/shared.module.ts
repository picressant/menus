import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FormFieldWrapperComponent } from './components/inputs/form-field-wrapper/form-field-wrapper.component';
import { ReactiveFormsModule } from "@angular/forms";
import { ConfirmationModalComponent } from "./components/modals/confirmation-modal/confirmation-modal.component";
import { SecurePipe } from "./pipes/secure.pipe";
import { LoadingImgComponent } from "./components/loading/loading-img/loading-img.component";

@NgModule({
  declarations: [
    FormFieldWrapperComponent,
    ConfirmationModalComponent,
    SecurePipe,
    LoadingImgComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    ConfirmationModalComponent
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FormFieldWrapperComponent,
    SecurePipe,
    LoadingImgComponent
  ]
})
export class SharedModule {
}
