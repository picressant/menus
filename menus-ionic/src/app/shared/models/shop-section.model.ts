import { AbstractData } from '@models/abstract-data.model';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { mergeFormGroups } from '../helpers/form.helpers';

export class ShopSection extends AbstractData {
    name: string;

    static form(fb: UntypedFormBuilder) {
        const form = fb.group({
            name: ['', Validators.required]
        });

        return mergeFormGroups(form, AbstractData.form(fb));
    }
}
