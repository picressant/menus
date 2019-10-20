import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidedishListPageComponent } from './pages/sidedish-list-page/sidedish-list-page.component';
import { SidedishDialogComponent } from './components/sidedish-dialog/sidedish-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SidedishTableComponent } from './components/sidedish-table/sidedish-table.component';

@NgModule({
  declarations: [SidedishListPageComponent, SidedishDialogComponent, SidedishTableComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    SidedishListPageComponent
  ],
  entryComponents: [
    SidedishDialogComponent
  ]
})
export class SidedishModule { }
