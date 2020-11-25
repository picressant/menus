import { Component, Input, OnInit } from '@angular/core';
import { BookRecipe } from "@models/book-recipe.model";
import { Recipe } from "@models/recipe.model";

@Component({
    selector: 'app-recipe-item-card',
    templateUrl: './recipe-item-card.component.html',
    styleUrls: ['./recipe-item-card.component.scss'],
})
export class RecipeItemCardComponent implements OnInit {

    @Input()
    recipe: BookRecipe;
    imgStyles: any;

    loadedImg = false;

    constructor() {
    }

    ngOnInit() {
    }

    onImageLoad(event: Event) {
        this.loadedImg = true;
    }
}
