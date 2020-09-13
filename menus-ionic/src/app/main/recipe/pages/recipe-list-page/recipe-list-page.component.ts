import { Component, OnInit, ViewChild } from '@angular/core';
import { Recipe } from "@models/recipe.model";
import { Pager } from "@models/pager/pager.model";
import { Pageable } from "@models/pager/pageable.model";
import { RecipeRestService } from "../../service/recipe-rest.service";
import { Router } from "@angular/router";
import { IonInfiniteScroll } from "@ionic/angular";

@Component({
    selector: 'app-recipe-list-page',
    templateUrl: './recipe-list-page.component.html',
    styleUrls: ['./recipe-list-page.component.scss'],
})
export class RecipeListPageComponent implements OnInit {

    recipes: Recipe[] = [];
    private pager: Pager;
    private currentPageable: Pageable<Recipe>;

    @ViewChild(IonInfiniteScroll)
    infiniteScroll: IonInfiniteScroll;

    constructor(
        private recipeRest: RecipeRestService,
        private router: Router
    ) {
        this.pager = new Pager(2);
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.pager.page = 0;
        this.recipes = [];
        this._load();

    }

    private _loadAndComplete(event: any) {
        this.recipeRest.getRecipes(this.pager).subscribe(recipes => {
            this.recipes = this.recipes.concat(recipes.content);
            this.currentPageable = recipes;
            this.toggleInfiniteScroll();

            event.target.complete();
        });
    }

    private _load() {
        this.recipeRest.getRecipes(this.pager).subscribe(recipes => {
            this.recipes = this.recipes.concat(recipes.content);
            this.currentPageable = recipes;
            this.toggleInfiniteScroll();
        });
    }

    toggleInfiniteScroll() {
        this.infiniteScroll.disabled = (this.pager.page >= this.currentPageable.totalPages)
    }

    onScrollDown(event) {
        setTimeout(() => {
            if (this.pager.page < this.currentPageable.totalPages) {
                this.pager.page++;
                this._loadAndComplete(event);
            }
            else {
                this.toggleInfiniteScroll();
            }
        });
    }

    onSearch(search: CustomEvent) {
        this.pager.search = search.detail.value;
        this.pager.page = 0;
        this.recipes = [];
        this._load();
    }

    onAdd() {
        this.router.navigate(["main/recipe/add"]);
    }

    goToRecipe(recipe: Recipe) {
        this.router.navigate(["main/recipe", recipe.id]);
    }


    doRefresh(event: any) {
        this.pager.page = 0;
        this.recipes = [];
        this._loadAndComplete(event);
    }
}
