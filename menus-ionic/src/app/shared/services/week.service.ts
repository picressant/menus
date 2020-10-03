import { Injectable } from "@angular/core";
import { Week } from "@models/week.model";
import { WeekRestService } from "./week-rest.service";
import { BehaviorSubject } from "rxjs";
import { WeekMeal } from "@models/week-meal.model";
import { ToasterService } from "@services/toaster.service";

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

@Injectable({
    providedIn: 'root'
})
export class WeekService {
    private _meals : WeekMeal[] = [];
    private week: Week;
    public meals$: BehaviorSubject<WeekMeal[]> = new BehaviorSubject([]);

    constructor(
        private weekRestService: WeekRestService,
        private toaster: ToasterService
    ) {
    }

    public updateMeal(meal: WeekMeal, i: number) {
        this._meals[i] = meal;
        this.meals$.next(this._meals);
        this.saveAllMeals(this._meals);
    }

    public deleteMeal(i: number) {
        this._meals[i] = null;
        this.meals$.next(this._meals);
        this.saveAllMeals(this._meals);
    }

    public saveAllMeals(meals: WeekMeal[]) {
        this.saveWeek(this._mapArrayToWeek(meals));
    }
    public saveMeals() {
        this.saveWeek(this._mapArrayToWeek(this._meals));
    }

    private saveWeek(week: Week) {
        this.weekRestService.setWeek(week).subscribe(w => {
            this.toaster.info("Semaine sauvegardée");
            this.loadWeek(w);
        });
    }

    private loadWeek(week: Week) {
        this.week = week;
        this._meals = this._mapWeekToArray(week);
        this.meals$.next(this._meals);

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
        if (!this.week) {
            return new Week();
        }
        this.week.mondayLunch = meals[days.mondayLunch];
        this.week.mondayDinner = meals[days.mondayDinner];
        this.week.tuesdayLunch = meals[days.tuesdayLunch];
        this.week.tuesdayDinner = meals[days.tuesdayDinner];
        this.week.wednesdayLunch = meals[days.wednesdayLunch];
        this.week.wednesdayDinner = meals[days.wednesdayDinner];
        this.week.thursdayLunch = meals[days.thursdayLunch];
        this.week.thursdayDinner = meals[days.thursdayDinner];
        this.week.fridayLunch = meals[days.fridayLunch];
        this.week.fridayDinner = meals[days.fridayDinner];
        this.week.saturdayLunch = meals[days.saturdayLunch];
        this.week.saturdayDinner = meals[days.saturdayDinner];
        this.week.sundayLunch = meals[days.sundayLunch];
        this.week.sundayDinner = meals[days.sundayDinner];

        return this.week;
    }

    getWeekFromApi() {
        this.weekRestService.getWeek().subscribe(w => this.loadWeek(w));
    }

    getWeek(): Week {
        return this._mapArrayToWeek(this._meals);
    }
}
