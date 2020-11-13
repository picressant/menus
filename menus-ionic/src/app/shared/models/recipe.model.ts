import { IngredientQuantity } from './ingredient-quantity.model';
import { AbstractData } from "./abstract-data.model";
import { FormBuilder, Validators } from "@angular/forms";
import { mergeFormGroups } from "../helpers/form.helpers";

export class Recipe extends AbstractData {
    name: string;
    ingredients: IngredientQuantity[];
    jacksonType: string;

    constructor() {
        super();
        this.ingredients = [];
        this.jacksonType = "recipe";
    }

    static form(fb: FormBuilder, jacksonType: string = "recipe") {
        const form = fb.group({
            name: ['', Validators.required],
            ingredients: [[]],
            jacksonType: [jacksonType, Validators.required]
        });

        return mergeFormGroups(form, AbstractData.form(fb));
    }

    static isRecipeFree(recipe: Recipe): boolean {
        return (recipe.jacksonType === "recipe");
    }

    static isRecipeBook(recipe: Recipe): boolean {
        return (recipe.jacksonType === "bookRecipe");
    }
}
