import { AbstractData } from "./abstract-data.model";
import { FormBuilder, Validators } from "@angular/forms";
import { mergeFormGroups } from "../helpers/form.helpers";

export class Group extends AbstractData {
  name: string;

  static form(fb: FormBuilder) {
    const form = fb.group({
      name: [null, Validators.required]
    });

    return mergeFormGroups(form, AbstractData.form(fb));
  }
}
