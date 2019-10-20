import { Component } from '@angular/core';
import { AbstractPageableSelectorComponent } from "../abstract-pageable-selector.component";
import { IngredientRestService } from "../../../../main/services/ingredient-rest.service";
import { NgControl } from "@angular/forms";
import { Ingredient } from "../../../models/ingredient.model";

@Component({
  selector: 'menus-ingredient-selector',
  templateUrl: './ingredient-selector.component.html',
  styleUrls: ['./ingredient-selector.component.less']
})
export class IngredientSelectorComponent extends AbstractPageableSelectorComponent<Ingredient> {

  constructor(
    private ingredientService: IngredientRestService,
    public ngControl: NgControl
  ) {
    super();
    ngControl.valueAccessor = this;
  }

  load(isSetValue: boolean) {
    this.isLoading = true;
    this.ingredientService.getIngredients(this.pager).subscribe(
      (data) => this.setContent(data, isSetValue)
    );
  }

  get isError() {
    return this.ngControl.invalid && this.ngControl.touched;
  }
}
