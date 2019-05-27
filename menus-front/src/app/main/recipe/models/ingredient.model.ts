import { IngredientUnit } from './ingredient-unit.enum';

export class Ingredient {
    id: String;
    name: String;
    quantity: number;
    unit: IngredientUnit;
}