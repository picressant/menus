import { IngredientQuantity } from './ingredient-quantity.model';
import { AbstractData } from "./abstract-data.model";
import { FormBuilder, Validators } from "@angular/forms";
import { mergeFormGroups } from "@helpers/form.helpers";
import { SelectedIngredient } from "@models/selected-ingredient.model";

export class Recipe extends AbstractData {
    name: string;
    selectedIngredients: SelectedIngredient[];
    jacksonType: string;

    constructor() {
        super();
        this.selectedIngredients = [];
        this.jacksonType = "recipe";
    }

    static form(fb: FormBuilder, jacksonType: string = "recipe") {
        const form = fb.group({
            name: ['', Validators.required],
            selectedIngredients: [[]],
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
