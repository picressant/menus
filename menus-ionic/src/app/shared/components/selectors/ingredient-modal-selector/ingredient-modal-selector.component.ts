import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from "@ionic/angular";
import { Ingredient } from "@models/ingredient.model";
import { IngredientRestService } from "../../../services/ingredient-rest.service";
import { Pageable } from "@models/pager/pageable.model";
import { Pager } from "@models/pager/pager.model";

@Component({
    selector: 'app-ingredient-modal-selector',
    templateUrl: './ingredient-modal-selector.component.html',
    styleUrls: ['./ingredient-modal-selector.component.scss'],
})
export class IngredientModalSelectorComponent implements OnInit {
    ingredients: Ingredient[] = [];
    private pagerIngredients: Pager;
    private pageableIngredients: Pageable<Ingredient>;

    @ViewChild(IonInfiniteScroll)
    infiniteScroll: IonInfiniteScroll;

    @Input()
    excludeIds: string[];

    constructor(
        private modalController: ModalController,
        private ingredientRest: IngredientRestService
    ) {
        this.pagerIngredients = new Pager(20);
    }

    ngOnInit() {
        this.loadIngredients(null);
    }

    closeModal(ingredient: Ingredient) {
        this.ingredients = [];
        this.pagerIngredients = new Pager(20);
        this.toggleInfiniteScroll();
        this.modalController.dismiss({
            'ingredient': ingredient
        });
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

}
