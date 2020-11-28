import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WeekMeal } from "@models/week-meal.model";
import { Recipe } from "@models/recipe.model";
import { BookRecipe } from "@models/book-recipe.model";
import { GroceryItem } from "@models/grocery-item.model";
import { WeekService } from "@services/week.service";
import { GroceriesRestService } from "@services/groceries-rest.service";
import { PopoverController } from "@ionic/angular";
import { ShopSection } from "@models/shop-section.model";
import { Ingredient } from "@models/ingredient.model";
import { OptionPopoverComponent } from "@components/popover/option-popover/option-popover.component";
import { ConfirmationAlertService } from "@services/confirmation-alert.service";

@Component({
    selector: 'app-groceries-list-page',
    templateUrl: './groceries-list-page.component.html',
    styleUrls: ['./groceries-list-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroceriesListPageComponent implements OnInit {

    groceriesMapped: Map<String, GroceryItem[]>;
    loading = false;
    isEditing: boolean = false;

    shopSections: ShopSection[] = [];

    constructor(
        private weekService: WeekService,
        private groceryRestService: GroceriesRestService,
        private popoverController: PopoverController,
        private cdr: ChangeDetectorRef,
        private confirmationService: ConfirmationAlertService
    ) {
    }

    ngOnInit() {
        this.reload();
    }

    public reload(event: any = null) {
        this.startLoading();
        this.groceryRestService.getGroceries().subscribe(items => {
            this.shopSections = [];
            this.groceriesMapped = new Map<String, GroceryItem[]>();
            items.forEach(item => this.convertToMap(item));
            this.endLoading();
            if (event)
                event.target.complete();
        });
    }

    getSections(id: String) {
        return this.shopSections.find(value => value.id === id);
    }

    public resetGroceries() {
        this.startLoading();

        const meals: WeekMeal[] = this.weekService.meals$.getValue();

        this.shopSections = [];
        this.groceriesMapped = new Map<String, GroceryItem[]>();

        meals.forEach(meal => {
            if (meal !== null) {

                if (meal.recipe) {
                    const recipePersons = Recipe.isRecipeBook(meal.recipe) ? (meal.recipe as BookRecipe).persons : 1;
                    const recipeRatio = Recipe.isRecipeFree(meal.recipe) ? 1 : meal.persons / recipePersons;

                    meal.recipe.ingredients.forEach(i => {
                        this.addToList(i.ingredient, i.quantity, recipeRatio);
                    });
                }

                meal.sideDishes.forEach(side => {
                    side.ingredients.forEach(i => {
                        this.addToList(i.ingredient, i.quantity, meal.persons);
                    });
                });
            }
        });

        this.pushGrocery();
    }

    public convertToMap(item: GroceryItem) {
        if (!this.groceriesMapped.has(item.ingredient.shopSection.id)) {
            this.shopSections.push(item.ingredient.shopSection);
            this.groceriesMapped.set(item.ingredient.shopSection.id, []);
        }

        const list = this.groceriesMapped.get(item.ingredient.shopSection.id);
        list.push(item);
    }

    public addToList(ingredient: Ingredient, quantity: number, ratio: number): GroceryItem {

        if (!this.groceriesMapped.has(ingredient.shopSection.id)) {
            this.shopSections.push(ingredient.shopSection);
            this.groceriesMapped.set(ingredient.shopSection.id, []);
        }

        const list = this.groceriesMapped.get(ingredient.shopSection.id);
        const index = list.findIndex(i => i.ingredient.id === ingredient.id);

        if (index < 0) {
            const item = new GroceryItem();
            item.ingredient = ingredient;
            item.checked = false;
            item.quantity = quantity * ratio;
            list.push(item);
            return item;
        }
        else {
            list[index].quantity = list[index].quantity + (quantity * ratio);
            return list[index];
        }


    }

    async showOptions(event: any) {
        const options = [
            { clickedResult: "RESET", text: "Réinitialiser la liste" },
            { clickedResult: "EDIT", text: "Éditer la liste" }
        ];

        const popover = await this.popoverController.create({
            component: OptionPopoverComponent,
            event: event,
            translucent: true,
            componentProps: {
                options
            }
        });
        popover.present();

        const { data } = await popover.onWillDismiss();
        if (data && data.option) {
            if (data.option === "RESET")
                await this.confirmationService.confirm("Voulez-vous réinitialiser la liste de course ?", () => this.resetGroceries());
            else if (data.option === "EDIT") {
                this.isEditing = !this.isEditing;
                this.cdr.detectChanges();
            }
        }
    }

    onAddIngredient(item: GroceryItem) {
        this.startLoading();

        this.addToList(item.ingredient, item.quantity, 1);
        this.pushGrocery();
    }

    private pushGrocery() {
        let groceries = [];
        Array.from(this.groceriesMapped.values()).forEach(items => groceries = groceries.concat(items));

        this.groceryRestService.pushGroceries(groceries).subscribe(items => {
            this.shopSections = [];
            this.groceriesMapped = new Map<String, GroceryItem[]>();

            items.forEach(item => this.convertToMap(item));
            this.groceriesMapped.forEach((list, key) =>
                this.groceriesMapped.set(key, list.sort((a, b) =>
                    a.ingredient.name.toLocaleUpperCase().localeCompare(b.ingredient.name.toLocaleUpperCase()))))

            this.endLoading();
        });
    }

    private endLoading() {
        this.loading = false;
        this.cdr.detectChanges();
    }

    private startLoading() {
        this.loading = true;
        this.cdr.detectChanges();
    }

    onCheckItem(event: any, item: GroceryItem) {
        this.startLoading();
        item.checked = event.detail.checked;

        this.groceryRestService.updateGroceryItem(item).subscribe(() => this.endLoading());
    }

    doRefresh(event: any) {
        this.reload(event);
    }
}
