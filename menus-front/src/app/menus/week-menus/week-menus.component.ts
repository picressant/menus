import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Recette } from '../../recette/models/recette.model';
import { RecetteType } from '../../recette/models/recette-type.enum';
import { MatDialog } from '@angular/material';
import { WeekMenusSearchDialogComponent } from './week-menus-search-dialog/week-menus-search-dialog.component';
import { WeekMenusService } from '../week-menus.service';
import { Router } from '@angular/router';

@Component({
  selector: 'menus-week-menus',
  templateUrl: './week-menus.component.html',
  styleUrls: ['./week-menus.component.less']
})
export class WeekMenusComponent implements OnInit {

  recettes : Recette[] = [];

  days = [];

  week : Map<string, Recette>;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public weekService: WeekMenusService) {    
   }

   ngOnInit() {
     this.weekService.getWeek().subscribe((iMap: Map<string, Recette>) => {
       this.week = iMap;
       this.days = Array.from( this.week.keys() );
       this.recettes = Array.from( this.week.values() );       
     })
  }

  drop(event: CdkDragDrop<Recette[]>) {
    moveItemInArray(this.recettes, event.previousIndex, event.currentIndex);
  }  

  searchRecette(index: number) {
    console.log(index);
    const dialogRef = this.dialog.open(WeekMenusSearchDialogComponent, {
      width: '90%',
      height: '90%',
      data: {day: this.days[index], recette: this.recettes[index]}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined)
        this.recettes[index] = result;
        this._rebuildWeek();
    });
  }

  showRecette(index: number) {
    this.router.navigate(['recette', this.recettes[index].id]);
  }

  clearRecette(index: number) {
    this.recettes[index] = null;
    this._rebuildWeek();
  }

  private _rebuildWeek() {
    this.week = new Map<string, Recette>();
    for(let i=0; i<this.days.length; i++) {
      this.week.set(this.days[i], this.recettes[i]);
    }
    
    this.weekService.setWeek(this.week).subscribe();
  }



}
