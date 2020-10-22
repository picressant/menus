import { Component, Input, OnInit } from '@angular/core';
import { WeekMeal } from "@models/week-meal.model";
import { ActivatedRoute, Router } from "@angular/router";
import { WeekService } from "@services/week.service";
import { ModalController } from "@ionic/angular";
import { WeekSelectRecipeModalComponent } from "../../components/week-select-recipe-modal/week-select-recipe-modal.component";
import { WeekSelectSideModalComponent } from "../../components/week-select-side-modal/week-select-side-modal.component";
import { IngredientQuantity } from "@models/ingredient-quantity.model";
import { Ingredient } from "@models/ingredient.model";
import { BookRecipe } from "@models/book-recipe.model";

@Component({
    selector: 'app-modify-meal-page',
    templateUrl: './modify-meal-page.component.html',
    styleUrls: ['./modify-meal-page.component.scss'],
})
export class ModifyMealPageComponent implements OnInit {

    meal: WeekMeal;

    mealIndex: number;

    isEditing = false;

    @Input()
    isEdit: boolean = false;

    footerDetails = {
        name: "Détails",
        icon: "list-outline",
        selectedTab: "tab-details"
    }

    footerIngredients = {
        name: "Ingrédients",
        icon: "nutrition-outline",
        selectedTab: "tab-ingredients"
    }

    selectedTab = this.footerDetails.selectedTab;

    ingredientRecipeMap: Map<number, number>;
    ingredientSideMap: Map<number, number>;
    ingredients: Ingredient[] = [];


    constructor(
        private route: ActivatedRoute,
        private modalController: ModalController,
        private router: Router,
        private weekService: WeekService
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.mealIndex = params['index'];
            if (this.weekService.meals$.getValue()) {
                this.meal = this.weekService.meals$.getValue()[this.mealIndex];
                this.buildIngredients();
            }
        });

        this.weekService.meals$.subscribe(meals => {
            this.meal = meals[this.mealIndex];
            this.buildIngredients();
        });
    }

    buildIngredients() {
        if (this.meal && this.meal.recipe) {
            const persons = this.meal.recipe.jacksonType === "bookRecipe" ? (this.meal.recipe as BookRecipe).persons : 1;
            const ratio = this.meal.persons / persons;
            this.ingredientRecipeMap = new Map<number, number>();
            this.ingredientSideMap = new Map<number, number>();

            this.meal.recipe.ingredients.forEach(i => {
                this.addIngredientToMap(i, this.ingredientRecipeMap, ratio);
            });

            this.meal.sideDishes.forEach(side => {
                side.ingredients.forEach(i => {
                    this.addIngredientToMap(i, this.ingredientSideMap, ratio);
                });
            });
        }
    }

    private addIngredientToMap(ingredientQ: IngredientQuantity, mapI: Map<number, number>, ratio: number) {
        if (this.ingredients.findIndex(i => i.id === ingredientQ.ingredient.id) < 0) {
            this.ingredients.push(ingredientQ.ingredient);
        }

        const index = this.ingredients.findIndex(i => i.id === ingredientQ.ingredient.id);

        if (!mapI.has(index)) {
            mapI.set(index, 0);
        }

        mapI.set(index, mapI.get(index) + (ingredientQ.quantity * ratio));
    }


    submit() {
        this.weekService.updateMeal(this.meal, this.mealIndex);
        this.isEditing = false;
    }

    async selectMeal() {
        const modal = await this.modalController.create({
            component: WeekSelectRecipeModalComponent,
            componentProps: {
                loadOnInit: true
            }
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data.recipe) {
            if (!this.meal)
                this.meal = new WeekMeal();
            this.meal.recipe = data.recipe;
            this.buildIngredients();
        }
    }

    async addSide() {
        if (!this.meal)
            this.meal = new WeekMeal();

        const sidesId = this.meal.sideDishes.map(value => value.id);

        const modal = await this.modalController.create({
            component: WeekSelectSideModalComponent,
            componentProps: {
                sidesId
            }
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data.side) {
            if (!this.meal)
                this.meal = new WeekMeal();
            this.meal.sideDishes.push(data.side);
            this.buildIngredients();
        }
    }

    deleteSide(i: number) {
        this.meal.sideDishes.splice(i, 1);
        this.buildIngredients();
    }

    clickOnMeal() {
        if (this.isEditing) {
            this.selectMeal();
        }
        else {
            if (this.meal && this.meal.recipe) {
                this.router.navigate(["main/recipe", this.meal.recipe.id]);
            }
        }
    }
}
