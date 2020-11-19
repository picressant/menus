import { AbstractData } from "@models/abstract-data.model";
import { Ingredient } from "@models/ingredient.model";

export class GroceryItem extends AbstractData {
    ingredient: Ingredient;
    quantity: number;
    checked: boolean;
}
