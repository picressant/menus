import { FormGroup } from "@angular/forms";

export function mergeFormGroups(form: FormGroup, otherForm: FormGroup) {
  Object.keys(otherForm.controls).forEach(key => {
    form.registerControl(key, otherForm.controls[key]);
  });

  return form;
}
