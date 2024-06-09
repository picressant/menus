import { UntypedFormBuilder, Validators } from '@angular/forms';
import { mergeFormGroups } from '../helpers/form.helpers';
import { Recipe } from '@models/recipe.model';

export class BookRecipe extends Recipe {

    constructor() {
        super();
        this.steps = [];
        this.jacksonType = 'bookRecipe';
    }

    static JACKSON_TYPE = 'bookRecipe';
    preparationTime: number;
    cookingTime: number;
    persons: number;
    bookReference: string;
    steps: string[];

    static form(fb: UntypedFormBuilder) {
        const form = fb.group({
            preparationTime: ['', Validators.required],
            cookingTime: [''],
            persons: ['', [Validators.required]],
            steps: [[]],
            bookReference: [null],
        });

        return mergeFormGroups(form, Recipe.form(fb, 'bookRecipe'));
    }
}
