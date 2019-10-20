import { Component } from '@angular/core';
import { AbstractPageableSelectorComponent } from "../abstract-pageable-selector.component";
import { Recipe } from "../../../models/recipe.model";
import { NgControl } from "@angular/forms";
import { RecipeRestService } from "../../../../main/services/recipe-rest.service";

@Component({
  selector: 'menus-recipe-selector',
  templateUrl: './recipe-selector.component.html',
  styleUrls: ['./recipe-selector.component.less']
})
export class RecipeSelectorComponent extends AbstractPageableSelectorComponent<Recipe> {

  constructor(
    private recipeService: RecipeRestService,
    public ngControl: NgControl
  ) {
    super();
    ngControl.valueAccessor = this;
  }

  load(isSetValue: boolean) {
    this.isLoading = true;
    this.recipeService.getRecipes(this.pager).subscribe(
      (data) => this.setContent(data, isSetValue)
    );
  }

  get isError() {
    return this.ngControl.invalid && this.ngControl.touched;
  }


}
