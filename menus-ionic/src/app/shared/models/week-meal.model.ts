import { Recipe } from './recipe.model';
import { SideDish } from './sidedish.model';

export class WeekMeal {
    recipe: Recipe;
    sideDishes: SideDish[];

    constructor() {
        this.sideDishes = [];
    }
}
