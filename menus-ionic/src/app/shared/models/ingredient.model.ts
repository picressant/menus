import { Unit } from './unit.model';
import { AbstractData } from "@models/abstract-data.model";
import { FormBuilder, Validators } from "@angular/forms";
import { mergeFormGroups } from "@helpers/form.helpers";
import { ShopSection } from "@models/shop-section.model";

export class Ingredient extends AbstractData {
    name: string;
    units: Unit[];
    forRecipe: boolean;
    shopSection: ShopSection

    static form(fb: FormBuilder) {
        const form = fb.group({
            name: ['', Validators.required],
            units: [[], Validators.required],
            forRecipe: [true, Validators.required],
            shopSection: [null, Validators.required]
        });

        return mergeFormGroups(form, AbstractData.form(fb));
    }
}
