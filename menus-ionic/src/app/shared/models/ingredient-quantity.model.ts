import { Ingredient } from './ingredient.model';

export class IngredientQuantity {
    ingredient: Ingredient;
    quantity: number;

    static sort(list: IngredientQuantity[]): IngredientQuantity[] {
        return list.sort((a, b) => a.ingredient.name.localeCompare(b.ingredient.name));
    }
}
