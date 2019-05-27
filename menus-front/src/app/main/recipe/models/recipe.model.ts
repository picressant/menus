import { Ingredient } from './ingredient.model';

export class Recipe {
    
    id: string;

    name: string;

    preparationTime: number;

    cookingTime: number;

    persons: number;

    ingredients: Ingredient[];

    constructor() {
        this.ingredients = [];
    }
}
