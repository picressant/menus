import { FormBuilder, Validators } from "@angular/forms";

export class User {
    id: string;
    firstname: string;
    lastname: string;
    username: string;

    static form(fb: FormBuilder) {
      return fb.group({
        id: [null],
        firstname: [null, Validators.required],
        lastname: [null, Validators.required],
        username: [null, Validators.required]
      });
    }
}

