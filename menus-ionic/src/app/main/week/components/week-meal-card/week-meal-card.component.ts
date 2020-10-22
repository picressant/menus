import { Component, Input, OnInit } from '@angular/core';
import { WeekMeal } from "@models/week-meal.model";
import { BookRecipe } from "@models/book-recipe.model";

@Component({
    selector: 'app-week-meal-card',
    templateUrl: './week-meal-card.component.html',
    styleUrls: ['./week-meal-card.component.scss'],
})
export class WeekMealCardComponent implements OnInit {

    @Input()
    meal: WeekMeal;
    imgStyles: any;

    @Input()
    showSides: boolean;

    constructor() {
    }

    ngOnInit() {
    }

    getRecipeAsBook() {
        if (this.meal && this.meal.recipe && this.meal.recipe.jacksonType === "bookRecipe")
            return this.meal.recipe as BookRecipe;
        return null;
    }

}
