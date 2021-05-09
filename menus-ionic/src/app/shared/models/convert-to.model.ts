import { AbstractData } from "@models/abstract-data.model";
import { Unit } from "@models/unit.model";
import { FormBuilder, Validators } from "@angular/forms";
import { mergeFormGroups } from "@helpers/form.helpers";

export class ConvertTo extends AbstractData {
    unitFrom: Unit;
    unitTo: Unit;
    factor: number;

    static form(fb: FormBuilder) {
        const form = fb.group({
            unitFrom: [null, Validators.required],
            unitTo: [null, Validators.required],
            factor: [null, Validators.required]
        });

        return mergeFormGroups(form, AbstractData.form(fb));
    }
}
