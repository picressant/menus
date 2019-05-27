import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    LayoutModule
  ],
  exports: [
    LayoutModule
  ]
})
export class CoreModule { }
