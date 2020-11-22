import { Recipe } from './recipe.model';
import { SideDish } from './sidedish.model';
import { MealDay } from "@models/enums/meal-day.enum";

export class WeekMeal {
    recipe: Recipe;
    sideDishes: SideDish[];
    persons: number;
    weekDayIndex: MealDay;

    constructor() {
        this.sideDishes = [];
        this.persons = 2;
    }
}
