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

    isEditingWeek = false;

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
        this.isEditingWeek = false;

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

        this.currentWeek.mondayLunch = meals[days.mondayLunch];
        this.currentWeek.mondayDinner = meals[days.mondayDinner];
        this.currentWeek.tuesdayLunch = meals[days.tuesdayLunch];
        this.currentWeek.tuesdayDinner = meals[days.tuesdayDinner];
        this.currentWeek.wednesdayLunch = meals[days.wednesdayLunch];
        this.currentWeek.wednesdayDinner = meals[days.wednesdayDinner];
        this.currentWeek.thursdayLunch = meals[days.thursdayLunch];
        this.currentWeek.thursdayDinner = meals[days.thursdayDinner];
        this.currentWeek.fridayLunch = meals[days.fridayLunch];
        this.currentWeek.fridayDinner = meals[days.fridayDinner];
        this.currentWeek.saturdayLunch = meals[days.saturdayLunch];
        this.currentWeek.saturdayDinner = meals[days.saturdayDinner];
        this.currentWeek.sundayLunch = meals[days.sundayLunch];
        this.currentWeek.sundayDinner = meals[days.sundayDinner];

        return this.currentWeek;
    }

    saveWeek() {
        this.weekService.setWeek(this._mapArrayToWeek(this.meals)).subscribe(
            (week) => this.setCurrentWeek(week));
    }

    clearRecette(index: number) {
        this.meals[index] = null;
        this.isModified = true;
    }


    ngOnDestroy(): void {
        this.saveWeek();
    }

    doReorder(event: any) {
        const itemToMove = this.meals.splice(event.detail.from, 1)[0];
        this.meals.splice(event.detail.to, 0, itemToMove);

        event.detail.complete();

        this.saveWeek()
    }

    goToRecipe(meal: WeekMeal) {
        if (meal && meal.recipe) {
            this.router.navigate(["main/recipe", meal.recipe.id]);
        }
    }

    editWeek() {
        this.isEditingWeek = true;
    }
}
