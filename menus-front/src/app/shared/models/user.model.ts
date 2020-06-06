import { FormBuilder, Validators } from "@angular/forms";
import { mergeFormGroups } from "../helpers/form.helpers";
import { AbstractData } from "./abstract-data.model";
import { Role } from "./role.enum";

export class User extends AbstractData {
    firstname: string;
    lastname: string;
    username: string;
    googleId: string;
    role: Role;

    static form(fb: FormBuilder) {
      const form =  fb.group({
        firstname: [null, Validators.required],
        lastname: [null, Validators.required],
        username: [null, Validators.required],
        googleId: [null],
        role: [Role.ROLE_USER, Validators.required]
      });

      return mergeFormGroups(form, AbstractData.form(fb));
    }
}

