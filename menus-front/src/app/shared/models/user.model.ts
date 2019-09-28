import { FormBuilder, Validators } from "@angular/forms";
import { mergeFormGroups } from "../helpers/form.helpers";
import { AbstractData } from "./abstract-data.model";

export class User extends AbstractData {
    firstname: string;
    lastname: string;
    username: string;

    static form(fb: FormBuilder) {
      const form =  fb.group({
        firstname: [null, Validators.required],
        lastname: [null, Validators.required],
        username: [null, Validators.required]
      });

      return mergeFormGroups(form, AbstractData.form(fb));
    }
}

