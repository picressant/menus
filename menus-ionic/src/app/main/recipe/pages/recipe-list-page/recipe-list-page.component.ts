import { Component, OnInit, ViewChild } from '@angular/core';
import { Recipe } from "@models/recipe.model";
import { RecipeRestService } from "@services/recipe-rest.service";
import { Router } from "@angular/router";
import { RecipeListComponent } from "@components/lists/recipe-list/recipe-list.component";

@Component({
    selector: 'app-recipe-list-page',
    templateUrl: './recipe-list-page.component.html',
    styleUrls: ['./recipe-list-page.component.scss'],
})
export class RecipeListPageComponent implements OnInit {

    @ViewChild(RecipeListComponent)
    recipeListComponent: RecipeListComponent;

    constructor(
        private recipeRest: RecipeRestService,
        private router: Router
    ) {

    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.recipeListComponent.refresh(null);
    }

    onAdd() {
        this.router.navigate(["main/recipe/add"]);
    }

    goToRecipe(recipe: Recipe) {
        this.router.navigate(["main/recipe", recipe.id]);
    }


    doRefresh(event: any) {
        this.recipeListComponent.refresh(event);
    }
}
