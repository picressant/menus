import { Component, Input, OnInit } from '@angular/core';
import { WeekMeal } from "@models/week-meal.model";
import { Ingredient } from "@models/ingredient.model";
import { IngredientQuantity } from "@models/ingredient-quantity.model";
import { BookRecipe } from "@models/book-recipe.model";
import { Recipe } from "@models/recipe.model";

@Component({
    selector: 'app-week-grocery-list',
    templateUrl: './week-grocery-list.component.html',
    styleUrls: ['./week-grocery-list.component.less']
})
export class WeekGroceryListComponent implements OnInit {

    ingredientMap: Map<number, number>;
    ingredients: Ingredient[] = [];

    constructor() {
    }

    ngOnInit() {
    }

    @Input("meals")
    set meals(meals: WeekMeal[]) {
        if (meals !== null && meals !== undefined) {
            this.ingredientMap = new Map<number, number>();

            meals.forEach(meal => {
                if (meal !== null) {

                    if (meal.recipe) {
                        const recipePersons = Recipe.isRecipeBook(meal.recipe) ? (meal.recipe as BookRecipe).persons : 1;
                        const recipeRatio = Recipe.isRecipeFree(meal.recipe) ? 1 : meal.persons / recipePersons;

                        meal.recipe.ingredients.forEach(i => {
                            this.addIngredientToMap(i, recipeRatio);
                        });
                    }

                    meal.sideDishes.forEach(side => {
                        side.ingredients.forEach(i => {
                            this.addIngredientToMap(i, meal.persons);
                        });
                    });
                }
            });
        }
    }

    private addIngredientToMap(ingredientQ: IngredientQuantity, ratio: number) {
        if (this.ingredients.findIndex(i => i.id === ingredientQ.ingredient.id) < 0) {
            this.ingredients.push(ingredientQ.ingredient);
        }

        const index = this.ingredients.findIndex(i => i.id === ingredientQ.ingredient.id);

        if (!this.ingredientMap.has(index)) {
            this.ingredientMap.set(index, 0);
        }

        this.ingredientMap.set(index, this.ingredientMap.get(index) + (ingredientQ.quantity * ratio));
    }


}
