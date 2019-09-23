import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { SideDishSelectorComponent } from './components/side-dish-selector/side-dish-selector.component';

@NgModule({
  declarations: [SideDishSelectorComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
