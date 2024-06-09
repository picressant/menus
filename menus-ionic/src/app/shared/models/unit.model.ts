import { AbstractData } from '@models/abstract-data.model';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { mergeFormGroups } from '../helpers/form.helpers';

export class Unit extends AbstractData {
    name: string;
    symbol: string;

    static form(fb: UntypedFormBuilder) {
        const form = fb.group({
            name: ['', Validators.required],
            symbol: ['', Validators.required]
        });

        return mergeFormGroups(form, AbstractData.form(fb));
    }
}
