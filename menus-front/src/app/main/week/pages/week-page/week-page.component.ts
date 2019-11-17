import { Component, OnInit } from '@angular/core';
import { WeekRestService } from '../../../services/week-rest.service';
import { Week } from 'src/app/shared/models/week.model';
import { WeekMeal } from 'src/app/shared/models/week-meal.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { SideDish } from 'src/app/shared/models/sidedish.model';
import { ChangeWeekMealDialogData } from '../../components/change-week-meal-dialog/change-week-meal-dialog-data.model';
import { MatDialog } from '@angular/material/dialog';
import { Search } from 'src/app/shared/models/search.model';
import { ChangeWeekMealDialogComponent } from '../../components/change-week-meal-dialog/change-week-meal-dialog.component';
import { Router } from "@angular/router";

const days = {
  mondayLunch: 0,
  mondayDinner: 1,
  tuesdayLunch: 2,
  tuesdayDinner: 3,
  wednesdayLunch: 4,
  wednesdayDinner: 5,
  thursdayLunch: 6,
  thursdayDinner: 7,
  fridayLunch: 8,
  fridayDinner: 9,
  saturdayLunch: 10,
  saturdayDinner: 11,
  sundayLunch: 12,
  sundayDinner: 13
};

@Component({
  selector: 'menus-week-page',
  templateUrl: './week-page.component.html',
  styleUrls: ['./week-page.component.less']
})
export class WeekPageComponent implements OnInit {

  meals: WeekMeal[];
  sidedishes: SideDish[];

  isModified = false;
  _id: string;


  constructor(
    private weekService: WeekRestService,
    public dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this._loadWeek();

    let search = new Search();
    search.term = "";
  }

  private _loadWeek() {
    this.weekService.getWeek().subscribe(
      (week) => {
        this.meals = this._mapWeekToArray(week);
        this._id = week.id;
        this.isModified = false;
      }
    );
  }

  getDay(index: number) {
    switch (index) {
      case 0:
        return "Lundi midi";
      case 1:
        return "Lundi soir";
      case 2:
        return "Mardi midi";
      case 3:
        return "Mardi soir";
      case 4:
        return "Mercredi midi";
      case 5:
        return "Mercredi soir";
      case 6:
        return "Jeudi midi";
      case 7:
        return "Jeudi soir";
      case 8:
        return "Vendredi midi";
      case 9:
        return "Vendredi soir";
      case 10:
        return "Samedi midi";
      case 11:
        return "Samedi soir";
      case 12:
        return "Dimanche midi";
      case 13:
        return "Dimanche soir";
    }
  }

  drop(event: CdkDragDrop<WeekMeal[]>) {
    moveItemInArray(this.meals, event.previousIndex, event.currentIndex);
    this.isModified = true;
  }

  private _mapWeekToArray(week: Week): WeekMeal[] {
    const meals: WeekMeal[] = [];
    meals[days.mondayLunch] = week.mondayLunch;
    meals[days.mondayDinner] = week.mondayDinner;
    meals[days.tuesdayLunch] = week.tuesdayLunch;
    meals[days.tuesdayDinner] = week.tuesdayDinner;
    meals[days.wednesdayLunch] = week.wednesdayLunch;
    meals[days.wednesdayDinner] = week.wednesdayDinner;
    meals[days.thursdayLunch] = week.thursdayLunch;
    meals[days.thursdayDinner] = week.thursdayDinner;
    meals[days.fridayLunch] = week.fridayLunch;
    meals[days.fridayDinner] = week.fridayDinner;
    meals[days.saturdayLunch] = week.saturdayLunch;
    meals[days.saturdayDinner] = week.saturdayDinner;
    meals[days.sundayLunch] = week.sundayLunch;
    meals[days.sundayDinner] = week.sundayDinner;

    return meals;
  }

  private _mapArrayToWeek(meals: WeekMeal[]): Week {
    const week: Week = new Week();

    week.mondayLunch = meals[days.mondayLunch];
    week.mondayDinner = meals[days.mondayDinner];
    week.tuesdayLunch = meals[days.tuesdayLunch];
    week.tuesdayDinner = meals[days.tuesdayDinner];
    week.wednesdayLunch = meals[days.wednesdayLunch];
    week.wednesdayDinner = meals[days.wednesdayDinner];
    week.thursdayLunch = meals[days.thursdayLunch];
    week.thursdayDinner = meals[days.thursdayDinner];
    week.fridayLunch = meals[days.fridayLunch];
    week.fridayDinner = meals[days.fridayDinner];
    week.saturdayLunch = meals[days.saturdayLunch];
    week.saturdayDinner = meals[days.saturdayDinner];
    week.sundayLunch = meals[days.sundayLunch];
    week.sundayDinner = meals[days.sundayDinner];

    week.id = this._id;

    return week;
  }

  onChange(index: number) {
    const data = new ChangeWeekMealDialogData();
    data.index = index;
    data.weekmeal = this.meals[index];
    data.sidedishes = this.sidedishes;

    const dialogRef = this.dialog.open(ChangeWeekMealDialogComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.meals[index] = result;
        this.isModified = true;
      }
    });
  }

  onSave() {
    this.weekService.setWeek(this._mapArrayToWeek(this.meals)).subscribe(
      () => this._loadWeek()
    );
  }

  clearRecette(index: number) {
    this.meals[index] = null;
    this.isModified = true;
  }

  see(index: number) {
    this.router.navigate(["main/recipe", this.meals[index].recipe.id]);
  }
}
