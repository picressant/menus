import { AbstractData } from './abstract-data.model';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { mergeFormGroups } from '../helpers/form.helpers';

export class Group extends AbstractData {
  name: string;

  static form(fb: UntypedFormBuilder) {
    const form = fb.group({
      name: [null, Validators.required]
    });

    return mergeFormGroups(form, AbstractData.form(fb));
  }
}
