import { Component, Input, OnInit } from '@angular/core';
import { WeekMeal } from "@models/week-meal.model";
import { BookRecipe } from "@models/book-recipe.model";
import { Recipe } from "@models/recipe.model";

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
        if (this.meal && this.meal.recipe && !Recipe.isRecipeBook(this.meal.recipe))
            return this.meal.recipe as BookRecipe;
        return null;
    }


    get isFreeRecipe(): boolean {
        return (this.meal && this.meal.recipe && Recipe.isRecipeFree(this.meal.recipe))
    }

}
