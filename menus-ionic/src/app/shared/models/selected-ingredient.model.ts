import { Ingredient } from "@models/ingredient.model";
import { Unit } from "@models/unit.model";

export class SelectedIngredient {
    ingredient: Ingredient;
    unit: Unit;
    quantity: number;
}
