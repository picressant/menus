import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Recipe } from "@models/recipe.model";
import { Direction, Order, Pager } from "@models/pager/pager.model";
import { Pageable } from "@models/pager/pageable.model";
import { IonInfiniteScroll } from "@ionic/angular";
import { RecipeRestService } from "@services/recipe-rest.service";

@Component({
    selector: 'app-recipe-list',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {

    recipes: Recipe[] = [];
    private pager: Pager;
    private currentPageable: Pageable<Recipe>;

    @ViewChild(IonInfiniteScroll)
    infiniteScroll: IonInfiniteScroll;

    @Output()
    clickRecipe = new EventEmitter<Recipe>();

    @Input()
    set loadOnInit(load: boolean) {
        if (load)
            this.refresh(null);
    }

    constructor(
        private recipeRest: RecipeRestService
    ) {
        this.pager = new Pager(10);
        this.pager.pushFilter("_class", "fr.choupiteam.menus.application.recipe.model.BookRecipe")
        this.pager.orders.push(new Order("name", Direction.ASC));
    }

    ngOnInit() {
        if (this.loadOnInit)
           this.refresh(null);
    }

    refresh(event: any) {
        this.pager.page = 0;
        this.recipes = [];
        this._loadAndComplete(event);
    }

    private _loadAndComplete(event: any) {
        this.recipeRest.getRecipes(this.pager).subscribe(recipes => {
            this.recipes = this.recipes.concat(recipes.content);
            this.currentPageable = recipes;
            this.toggleInfiniteScroll();

            if (event) {
                event.target.complete();
            }
        });
    }

    toggleInfiniteScroll() {
        this.infiniteScroll.disabled = (this.pager.page >= this.currentPageable.totalPages)
    }

    onScrollDown(event) {
        if (this.pager.page < this.currentPageable.totalPages) {
            this.pager.page++;
            this._loadAndComplete(event);
        }
        else {
            this.toggleInfiniteScroll();
        }
    }

    onSearch(search: CustomEvent) {
        this.pager.search = search.detail.value;
        this.refresh(null);
    }

    onClickRecipe(recipe: Recipe) {
        this.clickRecipe.emit(recipe);
    }
}
