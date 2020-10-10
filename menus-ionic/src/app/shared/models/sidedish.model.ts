import { IngredientQuantity } from './ingredient-quantity.model';
import { AbstractData } from "@models/abstract-data.model";
import { FormBuilder, Validators } from "@angular/forms";
import { mergeFormGroups } from "../helpers/form.helpers";

export class SideDish extends AbstractData {
    name: string;
    ingredients: IngredientQuantity[];

    constructor() {
        super();
        this.ingredients = [];
    }

    static form(fb: FormBuilder) {
        const form = fb.group({
            name: ['', Validators.required],
            ingredients: [[]]
        });

        return mergeFormGroups(form, AbstractData.form(fb));
    }
}
