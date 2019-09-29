import { IngredientQuantity } from './ingredient-quantity.model';
import { AbstractData } from "./abstract-data.model";
import { FormBuilder, Validators } from "@angular/forms";
import { mergeFormGroups } from "../helpers/form.helpers";

export class Recipe extends AbstractData {
  name: string;
  preparationTime: number;
  cookingTime: number;
  persons: number;
  ingredients: IngredientQuantity[];

  constructor() {
    super();
    this.ingredients = [];
  }

  static form(fb: FormBuilder) {
    const form = fb.group({
      name: ['', Validators.required],
      preparationTime: ['', Validators.required],
      cookingTime: [''],
      persons: ['', [Validators.required]],
      ingredients: [[], Validators.required]
    });

    return mergeFormGroups(form, AbstractData.form(fb));
  }
}
