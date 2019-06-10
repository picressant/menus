import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidedishSearchComponent } from './sidedish-search/sidedish-search.component';
import { SidedishDialogComponent } from './sidedish-dialog/sidedish-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SidedishSearchComponent, SidedishDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    SidedishSearchComponent
  ],
  entryComponents: [
    SidedishDialogComponent
  ]
})
export class SidedishModule { }
