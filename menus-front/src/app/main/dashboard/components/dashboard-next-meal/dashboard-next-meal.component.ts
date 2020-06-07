import { Component, OnInit } from '@angular/core';
import { Week } from "../../../../shared/models/week.model";
import { WeekRestService } from "../../../services/week-rest.service";
import { WeekMeal } from "../../../../shared/models/week-meal.model";

@Component({
  selector: 'menus-dashboard-next-meal',
  templateUrl: './dashboard-next-meal.component.html',
  styleUrls: ['./dashboard-next-meal.component.less']
})
export class DashboardNextMealComponent implements OnInit {

  private currentWeek: Week;
  nextMeal: WeekMeal;
  searching = true;

  constructor(
    private weekRestService: WeekRestService
  ) {
  }

  ngOnInit() {
    this.weekRestService.getWeek().subscribe(week => {
      this.currentWeek = week;
      this.extractNextMeal();
    });
  }

  private extractNextMeal() {
    const currentDate = new Date();

    console.log(currentDate.getDay());
    console.log(currentDate.getHours() < 14);

    let day = currentDate.getDay();
    let isLunch = currentDate.getHours() < 14;
    let foundMeal = this.findMeal(day, isLunch);
    if (foundMeal === null) {
      do {
        if (!isLunch) {
          day = (day === 6) ? 0 : day+1;
        }
        isLunch = !isLunch;

        foundMeal = this.findMeal(day, isLunch);
      } while (foundMeal === null && (day !== currentDate.getDay() || isLunch !== (currentDate.getHours() < 14)))
    }

    this.nextMeal = foundMeal;
    this.searching = false;

  }

  private findMeal(day: number, isLunch: boolean) {
    if (day === 0) {
      return isLunch ? this.currentWeek.sundayLunch : this.currentWeek.sundayDinner;
    }
    else if (day === 1) {
      return isLunch ? this.currentWeek.mondayLunch : this.currentWeek.mondayDinner;
    }
    else if (day === 2) {
      return isLunch ? this.currentWeek.tuesdayLunch : this.currentWeek.tuesdayDinner;
    }
    else if (day === 3) {
      return isLunch ? this.currentWeek.wednesdayLunch : this.currentWeek.wednesdayDinner;
    }
    else if (day === 4) {
      return isLunch ? this.currentWeek.thursdayLunch : this.currentWeek.thursdayDinner;
    }
    else if (day === 5) {
      return isLunch ? this.currentWeek.fridayLunch : this.currentWeek.fridayDinner;
    }
    else if (day === 6) {
      return isLunch ? this.currentWeek.saturdayLunch : this.currentWeek.saturdayDinner;
    }

    return null;

  }


}
