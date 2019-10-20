import { Component, forwardRef } from '@angular/core';
import { AbstractPageableSelectorComponent } from "../abstract-pageable-selector.component";
import { Unit } from "../../../models/unit.model";
import { IngredientRestService } from "../../../../main/services/ingredient-rest.service";
import { FormControl, NG_VALUE_ACCESSOR, NgControl } from "@angular/forms";

@Component({
  selector: 'menus-unit-selector',
  templateUrl: './unit-selector.component.html',
  styleUrls: ['./unit-selector.component.less'],
})
export class UnitSelectorComponent extends AbstractPageableSelectorComponent<Unit> {

  constructor(
    private ingredientService: IngredientRestService,
    public ngControl: NgControl
  ) {
    super();
    ngControl.valueAccessor = this;
  }

  load(isSetValue: boolean) {
    this.isLoading = true;
    this.ingredientService.getUnits(this.pager).subscribe(
      (data) => this.setContent(data, isSetValue)
    );
  }

  get isError() {
    return this.ngControl.invalid && this.ngControl.touched;
  }


}
