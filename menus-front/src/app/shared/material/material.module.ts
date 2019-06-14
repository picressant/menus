import { NgModule } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatRadioModule,
    MatSnackBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTableModule,
    MatSelectModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatRadioModule,
        MatSnackBarModule,
        DragDropModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatTableModule,
        MatSelectModule,
        MatCardModule,

        // // browser part
        // BrowserModule,
        // BrowserAnimationsModule
    ],
    exports: [
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatRadioModule,
        MatSnackBarModule,
        DragDropModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatTableModule,
        MatSelectModule,
        MatCardModule,

        // browser part
        // BrowserModule,
        // BrowserAnimationsModule
    ]
})
export class MaterialModule { }
