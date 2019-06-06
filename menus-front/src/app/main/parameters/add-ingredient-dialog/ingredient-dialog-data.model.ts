import { Ingredient } from 'src/app/shared/models/ingredient.model';

import { Unit } from 'src/app/shared/models/unit.model';

export class IngredientDialogData {
    ingredient: Ingredient;
    units: Unit[];
}