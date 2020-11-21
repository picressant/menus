import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WeekMeal } from "@models/week-meal.model";
import { Recipe } from "@models/recipe.model";
import { BookRecipe } from "@models/book-recipe.model";
import { GroceryItem } from "@models/grocery-item.model";
import { WeekService } from "@services/week.service";
import { GroceriesRestService } from "@services/groceries-rest.service";
import { PopoverController } from "@ionic/angular";
import { OptionPopoverComponent } from "../../components/option-popover/option-popover.component";
import { ShopSection } from "@models/shop-section.model";
import { Ingredient } from "@models/ingredient.model";

@Component({
    selector: 'app-groceries-list-page',
    templateUrl: './groceries-list-page.component.html',
    styleUrls: ['./groceries-list-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroceriesListPageComponent implements OnInit {

    groceries: GroceryItem[] = [];
    groceriesMapped: Map<String, GroceryItem[]>;
    loading = false;
    isEditing: boolean = false;

    shopSections: ShopSection[] = [];

    constructor(
        private weekService: WeekService,
        private groceryRestService: GroceriesRestService,
        private popoverController: PopoverController,
        private cdr: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.reload();
    }

    public reload() {
        this.loading = true;
        this.groceryRestService.getGroceries().subscribe(items => {
            this.shopSections = [];
            this.groceriesMapped = new Map<String, GroceryItem[]>();
            items.forEach(item => this.convertToMap(item));
            this.loading = false;
            this.cdr.detectChanges();
        });
    }

    getSections(id: String) {
        return this.shopSections.find(value => value.id === id);
    }

    public resetGroceries() {
        this.loading = true;

        const meals: WeekMeal[] = this.weekService.meals$.getValue();
        this.groceries = [];
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

//     ingredientMapOrder = (a, b) => {
//     let ingredientA = this.ingredients[a.key];
//     let ingredientB = this.ingredients[b.key];
//
//     return ingredientA.name.toLocaleUpperCase().localeCompare(ingredientB.name.toLocaleUpperCase());
// };


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
        const popover = await this.popoverController.create({
            component: OptionPopoverComponent,
            event: event,
            translucent: true
        });
        popover.present();

        const { data } = await popover.onWillDismiss();
        if (data && data.option) {
            if (data.option === "RESET")
                this.resetGroceries();
            else if (data.option === "EDIT") {
                this.isEditing = !this.isEditing;
                this.cdr.detectChanges();
            }
        }
    }

    onAddIngredient(item: GroceryItem) {
        this.loading = true;
        this.cdr.detectChanges();

        this.addToList(item.ingredient, item.quantity, 1);
        this.pushGrocery();
    }

    private pushGrocery() {
        this.groceries = [];

        Array.from(this.groceriesMapped.values()).forEach(items => this.groceries = this.groceries.concat(items));

        this.groceryRestService.pushGroceries(this.groceries).subscribe(items => {
            this.groceries = items;

            this.shopSections = [];
            this.groceriesMapped = new Map<String, GroceryItem[]>();

            this.groceries.forEach(item => this.convertToMap(item));

            this.loading = false;
            this.cdr.detectChanges();
        });
    }

    onCheckItem(event: any, item: GroceryItem) {
        this.loading = true;
        item.checked = event.detail.checked;

        this.groceryRestService.updateGroceryItem(item).subscribe(() => this.loading = false);
    }
}
