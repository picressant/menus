import { UntypedFormGroup } from '@angular/forms';

export function mergeFormGroups(form: UntypedFormGroup, otherForm: UntypedFormGroup) {
  Object.keys(otherForm.controls).forEach(key => {
    form.registerControl(key, otherForm.controls[key]);
  });

  return form;
}
