import { Component, OnInit } from '@angular/core';
import { Recette } from '../../recette/models/recette.model';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { WeekMenusService } from '../week-menus.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { WeekMenusSearchDialogComponent } from '../week-menus/week-menus-search-dialog/week-menus-search-dialog.component';

@Component({
  selector: 'menus-week-menus-v2',
  templateUrl: './week-menus-v2.component.html',
  styleUrls: ['./week-menus-v2.component.less']
})
export class WeekMenusV2Component implements OnInit {

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
       console.log(this.week);
       this.days = Array.from( this.week.keys() );
       this.recettes = Array.from( this.week.values() );       
     })
  }

  drop(event: CdkDragDrop<Recette[]>) {
    moveItemInArray(this.recettes, event.previousIndex, event.currentIndex);
    // const lOld = this.recettes[event.currentIndex];
    // this.recettes[event.currentIndex] = this.recettes[event.previousIndex];
    // this.recettes[event.previousIndex] = lOld; 
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

  onDragStarted() {
    console.log('on drag started');
    navigator.vibrate([200]);
  }



}
