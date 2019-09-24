import { Ingredient } from 'src/app/shared/models/ingredient.model';
import { IngredientQuantity } from 'src/app/shared/models/ingredient-quantity.model';

export class IngredientQuantityDialog {
    ingredientQuantity: IngredientQuantity;
    ingredients: Ingredient[];
    index: number;
}