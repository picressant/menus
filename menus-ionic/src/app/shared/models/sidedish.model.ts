import { AbstractData } from "@models/abstract-data.model";
import { FormBuilder, Validators } from "@angular/forms";
import { mergeFormGroups } from "@helpers/form.helpers";
import { SelectedIngredient } from "@models/selected-ingredient.model";

export class SideDish extends AbstractData {
    name: string;
    selectedIngredients: SelectedIngredient[];

    constructor() {
        super();
    }

    static form(fb: FormBuilder) {
        const form = fb.group({
            name: ['', Validators.required],
            selectedIngredients: [[]]
        });

        return mergeFormGroups(form, AbstractData.form(fb));
    }
}
