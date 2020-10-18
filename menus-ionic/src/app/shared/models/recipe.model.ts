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
  bookReference: string;
  steps: string[];

  constructor() {
    super();
    this.ingredients = [];
    this.steps = [];
  }

  static form(fb: FormBuilder) {
    const form = fb.group({
      name: ['', Validators.required],
      preparationTime: ['', Validators.required],
      cookingTime: [''],
      persons: ['', [Validators.required]],
      ingredients: [[]],
      steps: [[]],
      bookReference: [null]
    });

    return mergeFormGroups(form, AbstractData.form(fb));
  }
}
