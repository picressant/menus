import { NgModule } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
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
