import { FormBuilder } from "@angular/forms";

export class AbstractData {
  id: string;

  static form(fb: FormBuilder) {
    return fb.group({
      id: [null]
    });
  }
}
