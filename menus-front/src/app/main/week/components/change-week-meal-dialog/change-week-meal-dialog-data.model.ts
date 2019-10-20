import { SideDish } from 'src/app/shared/models/sidedish.model';
import { WeekMeal } from 'src/app/shared/models/week-meal.model';

export class ChangeWeekMealDialogData {
  weekmeal: WeekMeal;
  sidedishes: SideDish[];
  index: number;
}
