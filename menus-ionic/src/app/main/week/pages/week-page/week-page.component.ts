import { Component, OnInit } from '@angular/core';
import { WeekMeal } from "@models/week-meal.model";
import { SideDish } from "@models/sidedish.model";
import { WeekRestService } from "../../../services/week-rest.service";
import { Week } from "@models/week.model";
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
    selector: 'app-week-page',
    templateUrl: './week-page.component.html',
    styleUrls: ['./week-page.component.scss'],
})
export class WeekPageComponent implements OnInit {
    meals: WeekMeal[];
    currentWeek: Week;
    sidedishes: SideDish[];

    isModified = false;
    _id: string;

    footerDay = {
        name: "Aujourd'hui",
        icon: "today-outline",
        selectedTab: "tab-day"
    }

    footerWeek = {
        name: "Semaine",
        icon: "calendar-outline",
        selectedTab: "tab-week"
    }

    footerGrocery = {
        name: "Courses",
        icon: "checkbox-outline",
        selectedTab: "tab-grocery"
    }

    selectedTab: string = this.footerDay.selectedTab;

    todayLunch: WeekMeal;
    todayDinner: WeekMeal;

    constructor(
        private weekService: WeekRestService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this._loadWeek();
    }

    private _loadWeek() {
        this.weekService.getWeek().subscribe(
            (week) => {
               this.setCurrentWeek(week);
            }
        );
    }

    private setCurrentWeek(week: Week) {
        this.currentWeek = week;
        this.meals = this._mapWeekToArray(week);

        this.changeTodayMeal();
    }

    changeTodayMeal() {
        const currentDate = new Date();
        let day = currentDate.getDay();

        if (day === 0) {
            this.todayLunch = this.currentWeek.sundayLunch;
            this.todayDinner = this.currentWeek.sundayDinner;
        }
        else if (day === 1) {
            this.todayLunch = this.currentWeek.mondayLunch;
            this.todayDinner = this.currentWeek.mondayDinner;
        }
        else if (day === 2) {
            this.todayLunch = this.currentWeek.tuesdayLunch;
            this.todayDinner = this.currentWeek.tuesdayDinner;
        }
        else if (day === 3) {
            this.todayLunch = this.currentWeek.wednesdayLunch;
            this.todayDinner = this.currentWeek.wednesdayDinner;
        }
        else if (day === 4) {
            this.todayLunch = this.currentWeek.thursdayLunch;
            this.todayDinner = this.currentWeek.thursdayDinner;
        }
        else if (day === 5) {
            this.todayLunch = this.currentWeek.fridayLunch;
            this.todayDinner = this.currentWeek.fridayDinner;
        }
        else if (day === 6) {
            this.todayLunch = this.currentWeek.saturdayLunch;
            this.todayDinner = this.currentWeek.saturdayDinner;
        }
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

    onSave() {
        this.weekService.setWeek(this._mapArrayToWeek(this.meals)).subscribe(
            () => this._loadWeek()
        );
    }

    clearRecette(index: number) {
        this.meals[index] = null;
        this.isModified = true;
    }


    ngOnDestroy(): void {
        this.onSave();
    }

    doReorder(event: any) {
        const itemToMove = this.meals.splice(event.detail.from, 1)[0];
        this.meals.splice(event.detail.to, 0, itemToMove);

        event.detail.complete();

        this.weekService.setWeek(this._mapArrayToWeek(this.meals)).subscribe((week: Week) => this.setCurrentWeek(week));
    }

    goToRecipe(meal: WeekMeal) {
        if (meal && meal.recipe) {
            this.router.navigate(["main/recipe", meal.recipe.id]);
        }
    }
}
