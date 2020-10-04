import { Component, Input, OnInit } from '@angular/core';
import { WeekMeal } from "../../../../shared/models/week-meal.model";
import { Ingredient } from "../../../../shared/models/ingredient.model";
import { IngredientQuantity } from "../../../../shared/models/ingredient-quantity.model";

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
                        meal.recipe.ingredients.forEach(i => {
                            this.addIngredientToMap(i);
                        });
                    }

                    meal.sideDishes.forEach(side => {
                        side.ingredients.forEach(i => {
                            this.addIngredientToMap(i);
                        });
                    });
                }
            });
        }
    }

    private addIngredientToMap(ingredientQ: IngredientQuantity) {
        if (this.ingredients.findIndex(i => i.id === ingredientQ.ingredient.id) < 0) {
            this.ingredients.push(ingredientQ.ingredient);
        }

        const index = this.ingredients.findIndex(i => i.id === ingredientQ.ingredient.id);

        if (!this.ingredientMap.has(index)) {
            this.ingredientMap.set(index, 0);
        }

        this.ingredientMap.set(index, this.ingredientMap.get(index) + ingredientQ.quantity);
    }


}
