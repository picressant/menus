import { Injectable } from "@angular/core";
import { WeekRestService } from "./week-rest.service";
import { BehaviorSubject } from "rxjs";
import { WeekMeal } from "@models/week-meal.model";
import { ToasterService } from "@services/toaster.service";
import { RecipeRestService } from "@services/recipe-rest.service";
import { Recipe } from "@models/recipe.model";
import { WeekDay } from "@angular/common";
import { MealDay } from "@models/enums/meal-day.enum";

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
    private _meals: WeekMeal[] = [];
    public meals$: BehaviorSubject<WeekMeal[]> = new BehaviorSubject([]);

    constructor(
        private weekRestService: WeekRestService,
        private recipeRestService: RecipeRestService,
        private toaster: ToasterService
    ) {
    }

    public updateMeal(meal: WeekMeal, i: number) {
        this._meals[i] = meal;
        if (meal.recipe && Recipe.isRecipeFree(meal.recipe)) {
            if (!meal.recipe.id) {
                this.recipeRestService.addRecipe(meal.recipe).subscribe(r => {
                    this._meals[i].recipe = r;
                    this.pushAndSave();
                });
            }
            else {
                this.recipeRestService.updateRecipe(meal.recipe).subscribe(r => {
                    this._meals[i].recipe = r;
                    this.pushAndSave();
                });
            }
        }
        else {
            this.pushAndSave();
        }
    }

    findMealIndex(weekDay: MealDay) {
        return this._meals.findIndex(value => value.weekDayIndex === weekDay);
    }

    private pushAndSave() {
        this.meals$.next(this._meals);
        this.saveWeek();
    }

    public deleteAll() {
        this._meals.forEach((meal, i) => this.resetMeal(i));

        this.meals$.next(this._meals);
        this.saveWeek();
    }

    private resetMeal(i: number) {
        this._meals[i].recipe = null;
        this._meals[i].sideDishes = [];
        this._meals[i].persons = 2;
    }

    public deleteMeal(i: number) {
        if (this._meals[i].recipe && Recipe.isRecipeFree(this._meals[i].recipe))
            this.recipeRestService.deleteRecipe(this._meals[i].recipe.id).subscribe();

        this.resetMeal(i);

        this.meals$.next(this._meals);
        this.saveWeek();
    }

    private saveWeek() {
        this.weekRestService.setWeek(this._meals).subscribe(w => {
            this.toaster.info("Semaine sauvegardée");
            this.loadWeek(w);
        });
    }

    private loadWeek(meals: WeekMeal[]) {
        this._meals = meals;
        this.meals$.next(this._meals);

    }

    getWeekFromApi() {
        this.weekRestService.getWeek().subscribe(meals => this.loadWeek(meals));
    }

    saveMeals(meals: WeekMeal[]) {
        this._meals = meals;
        this.saveWeek();
    }
}
