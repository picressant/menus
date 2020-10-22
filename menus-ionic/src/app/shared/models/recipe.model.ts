import { IngredientQuantity } from './ingredient-quantity.model';
import { AbstractData } from "./abstract-data.model";
import { FormBuilder, Validators } from "@angular/forms";
import { mergeFormGroups } from "../helpers/form.helpers";

export class Recipe extends AbstractData {
    name: string;
    ingredients: IngredientQuantity[];
    jacksonType: string;

    constructor() {
        super();
        this.ingredients = [];
    }

    static form(fb: FormBuilder) {
        const form = fb.group({
            name: ['', Validators.required],
            ingredients: [[]],
            jacksonType: ['recipe', Validators.required]
        });

        return mergeFormGroups(form, AbstractData.form(fb));
    }
}
