import { Unit } from './unit.model';
import { AbstractData } from "@models/abstract-data.model";
import { FormBuilder, Validators } from "@angular/forms";
import { mergeFormGroups } from "../helpers/form.helpers";

export class Ingredient extends AbstractData {
    name: string;
    unit: Unit;

    static form(fb: FormBuilder) {
        const form = fb.group({
            name: ['', Validators.required],
            unit: [null, Validators.required]
        });

        return mergeFormGroups(form, AbstractData.form(fb));
    }
}
