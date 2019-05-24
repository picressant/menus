import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { Recette } from '../../../recette/models/recette.model';

export interface DialogData {  
  day: string;
  recette: Recette;
}

@Component({
  selector: 'menus-week-menus-search-dialog',
  templateUrl: './week-menus-search-dialog.component.html',
  styleUrls: ['./week-menus-search-dialog.component.less']
})
export class WeekMenusSearchDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<WeekMenusSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onChooseEvent(iRecette: Recette) {
    this.data.recette = iRecette;
    this.dialogRef.close(iRecette);
  }

  ngOnInit() {
  }

}
