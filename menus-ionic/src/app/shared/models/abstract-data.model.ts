import { UntypedFormBuilder } from '@angular/forms';

export class AbstractData {
  id: string;

  static form(fb: UntypedFormBuilder) {
    return fb.group({
      id: [null]
    });
  }
}
