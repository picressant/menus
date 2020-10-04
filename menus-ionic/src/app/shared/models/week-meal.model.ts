import { Recipe } from './recipe.model';
import { SideDish } from './sidedish.model';

export class WeekMeal {
    recipe: Recipe;
    sideDishes: SideDish[];
    persons: number;
    weekDayIndex: number;

    constructor() {
        this.sideDishes = [];
        this.persons = 2;
    }
}
