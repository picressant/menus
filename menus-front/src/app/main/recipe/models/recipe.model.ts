import { Ingredient } from './ingredient.model';
import { IngredientQuantity } from './ingredient-quantity.model';

export class Recipe {
    
    id: string;

    name: string;

    preparationTime: number;

    cookingTime: number;

    persons: number;

    ingredients: IngredientQuantity[];

    constructor() {
        this.ingredients = [];
    }
}
