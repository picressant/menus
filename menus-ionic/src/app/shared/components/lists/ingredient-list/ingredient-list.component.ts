import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from "@models/ingredient.model";
import { Pager } from "@models/pager/pager.model";
import { Pageable } from "@models/pager/pageable.model";
import { IonInfiniteScroll } from "@ionic/angular";
import { IngredientRestService } from "@services/ingredient-rest.service";

@Component({
    selector: 'app-ingredient-list',
    templateUrl: './ingredient-list.component.html',
    styleUrls: ['./ingredient-list.component.scss'],
})
export class IngredientListComponent implements OnInit {

    ingredients: Ingredient[] = [];
    private pagerIngredients: Pager;
    private pageableIngredients: Pageable<Ingredient>;

    @ViewChild(IonInfiniteScroll)
    infiniteScroll: IonInfiniteScroll;

    @Input()
    excludeIds: string[];

    @Output()
    ingredientSelected: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();

    constructor(
        private ingredientRest: IngredientRestService
    ) {
        this.pagerIngredients = new Pager(20);
    }

    ngOnInit() {
        this.loadIngredients(null);
    }


    searchIngredient(text: string) {
        this.pagerIngredients.page = 0;
        this.pagerIngredients.search = text;
        this.ingredients = [];
        this.loadIngredients(null);
    }

    scrollIngredients(event) {
        if (this.pagerIngredients.page < this.pageableIngredients.totalPages) {
            this.pagerIngredients.page++;
            this.loadIngredients(event);
        }
        else {
            event.component.disableInfiniteScroll();
        }
    }

    private loadIngredients(event) {
        this.pagerIngredients.excludeIds = this.excludeIds;
        this.ingredientRest.getIngredients(this.pagerIngredients).subscribe((pageableResult: Pageable<Ingredient>) => {
            this.ingredients = this.ingredients.concat(pageableResult.content);
            this.pageableIngredients = pageableResult;
            this.toggleInfiniteScroll();

            if (event) {
                event.target.complete();
            }
        });
    }

    toggleInfiniteScroll() {
        this.infiniteScroll.disabled = (this.pagerIngredients.page >= this.pageableIngredients.totalPages)
    }

    clickIngredient(ingredient: Ingredient) {
        this.ingredientSelected.emit(ingredient);
    }

    refresh(event: any) {
        this.pagerIngredients.page = 0;
        this.ingredients = [];
        this.loadIngredients(event);
    }
}