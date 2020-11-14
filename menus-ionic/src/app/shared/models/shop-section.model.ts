import { AbstractData } from "@models/abstract-data.model";
import { FormBuilder, Validators } from "@angular/forms";
import { mergeFormGroups } from "../helpers/form.helpers";

export class ShopSection extends AbstractData {
    name: string;

    static form(fb: FormBuilder) {
        const form = fb.group({
            name: ['', Validators.required]
        });

        return mergeFormGroups(form, AbstractData.form(fb));
    }
}
