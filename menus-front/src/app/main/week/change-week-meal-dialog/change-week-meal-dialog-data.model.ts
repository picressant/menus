import { Recipe } from 'src/app/shared/models/recipe.model';
import { SideDish } from 'src/app/shared/models/sidedish.model';
import { WeekMeal } from 'src/app/shared/models/week-meal.model';

export class ChangeWeekMealDialogData {
    weekmeal: WeekMeal;
    recipes: Recipe[];
    sidedishes: SideDish[];
    index: number;
}