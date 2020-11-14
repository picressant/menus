import {
    AfterViewChecked,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { Ingredient } from "@models/ingredient.model";
import { Direction, Order, Pager } from "@models/pager/pager.model";
import { Pageable } from "@models/pager/pageable.model";
import { IonInfiniteScroll, IonSearchbar } from "@ionic/angular";
import { IngredientRestService } from "@services/ingredient-rest.service";
import { removeFromArray } from "../../../helpers/remove-array-element.function";
import { ConfirmationAlertService } from "@services/confirmation-alert.service";

@Component({
    selector: 'app-ingredient-list',
    templateUrl: './ingredient-list.component.html',
    styleUrls: ['./ingredient-list.component.scss'],
})
export class IngredientListComponent implements OnInit, AfterViewChecked {

    ingredients: Ingredient[] = [];
    private pagerIngredients: Pager;
    private pageableIngredients: Pageable<Ingredient>;

    @ViewChild(IonInfiniteScroll)
    infiniteScroll: IonInfiniteScroll;

    @ViewChild(IonSearchbar)
    searchBar: IonSearchbar;

    @Input()
    excludeIds: string[];

    @Output()
    ingredientSelected: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();

    @Input()
    canDelete: boolean = false;

    deleteIndex: number = -1;

    constructor(
        private ingredientRest: IngredientRestService,
        private confirmationService: ConfirmationAlertService,
        private cdr: ChangeDetectorRef
    ) {
        this.pagerIngredients = new Pager(20);
        this.pagerIngredients.orders.push(new Order("name", Direction.ASC));
    }

    ngOnInit() {
        this.loadIngredients(null);
    }

    ngAfterViewChecked() {
        this.searchBar.setFocus()
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

    deleteIngredient(ingredient: Ingredient) {
        if (this.canDelete) {
            this.confirmationService.confirm("Supprimer l'ingrédient \"" + ingredient.name + "\" ?", () => {
                this.ingredientRest.deleteIngredient(ingredient).subscribe(() => {
                    removeFromArray(this.ingredients, ingredient)
                });
            });
        }
    }

    refreshWiggle(i: number) {
        if (this.canDelete) {
            this.deleteIndex = i;
            this.cdr.detectChanges();
        }
    }
}
