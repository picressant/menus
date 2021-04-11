import { IngredientQuantity } from './ingredient-quantity.model';
import { AbstractData } from "@models/abstract-data.model";
import { FormBuilder, Validators } from "@angular/forms";
import { mergeFormGroups } from "@helpers/form.helpers";
import { SelectedIngredient } from "@models/selected-ingredient.model";

export class SideDish extends AbstractData {
    name: string;
    ingredients: IngredientQuantity[];
    selectedIngredients: SelectedIngredient[];

    constructor() {
        super();
        this.ingredients = [];
    }

    static form(fb: FormBuilder) {
        const form = fb.group({
            name: ['', Validators.required],
            ingredients: [[]],
            selectedIngredients: [[]]
        });

        return mergeFormGroups(form, AbstractData.form(fb));
    }
}
