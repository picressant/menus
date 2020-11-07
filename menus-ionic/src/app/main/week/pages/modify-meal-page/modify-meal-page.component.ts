import { Component, Input, OnInit } from '@angular/core';
import { WeekMeal } from "@models/week-meal.model";
import { ActivatedRoute, Router } from "@angular/router";
import { WeekService } from "@services/week.service";
import { ActionSheetController, AlertController, ModalController } from "@ionic/angular";
import { WeekSelectRecipeModalComponent } from "../../components/week-select-recipe-modal/week-select-recipe-modal.component";
import { WeekSelectSideModalComponent } from "../../components/week-select-side-modal/week-select-side-modal.component";
import { IngredientQuantity } from "@models/ingredient-quantity.model";
import { Ingredient } from "@models/ingredient.model";
import { BookRecipe } from "@models/book-recipe.model";
import { Recipe } from "@models/recipe.model";
import { IngredientModalSelectorComponent } from "@components/selectors/ingredient-modal-selector/ingredient-modal-selector.component";
import { RecipeRestService } from "@services/recipe-rest.service";

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
        private weekService: WeekService,
        private actionSheetController: ActionSheetController,
        private alertController: AlertController,
        private recipeRestController: RecipeRestService
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
            const recipeRatio = Recipe.isRecipeFree(this.meal.recipe) ? 1 : ratio;
            this.ingredientRecipeMap = new Map<number, number>();
            this.ingredientSideMap = new Map<number, number>();

            this.meal.recipe.ingredients.forEach(i => {
                this.addIngredientToMap(i, this.ingredientRecipeMap, recipeRatio);
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
        this.buildIngredients();
    }

    async selectBookRecipe() {
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

            if (this.isMealFreeRecipe) {
                this.recipeRestController.deleteRecipe(this.meal.recipe.id).subscribe();
            }
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

    get isMealFreeRecipe(): boolean {
        return (this.meal && this.meal.recipe && Recipe.isRecipeFree(this.meal.recipe));
    }

    clickOnMeal() {
        if (this.isEditing) {
            if (this.isMealFreeRecipe)
                this.editFreeMeal();
            else
                this.selectBookRecipe();
        }
        else {
            if (this.meal && this.meal.recipe && !this.isMealFreeRecipe) {
                this.router.navigate(["main/recipe", this.meal.recipe.id]);
            }
        }
    }

    async longPressedMeal() {
        if (this.isEditing) {
            const actionSheet = await this.actionSheetController.create({
                header: 'Recette',
                buttons: [{
                    text: 'Choisir une recette',
                    handler: () => {
                        this.selectBookRecipe();
                    }
                }, {
                    text: 'Saisie libre',
                    handler: () => {
                        this.editFreeMeal();
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel'
                }]
            });
            await actionSheet.present();
        }
    }

    private async editFreeMeal() {
        let name = (this.meal && this.meal.recipe) ? this.meal.recipe.name : "";
        const alert = await this.alertController.create({
            header: 'Nom de recette',
            inputs: [
                {
                    name: 'recipe',
                    type: 'text',
                    value: name
                }
            ],
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                    }
                }, {
                    text: 'Ok',
                    handler: (alertData) => {
                        if (!this.meal)
                            this.meal = new WeekMeal();

                        if (this.meal.recipe && !Recipe.isRecipeFree(this.meal.recipe))
                            this.meal.recipe = new Recipe();

                        this.meal.recipe.name = alertData.recipe;
                        this.buildIngredients();
                    }
                }]
        });

        await alert.present();
    }

    async addIngredientToRecipe() {
        const modal = await this.modalController.create({
            component: IngredientModalSelectorComponent,
            componentProps: {
                "excludeIds": this.meal.recipe.ingredients.map(iq => iq.ingredient.id)
            }
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data.ingredient) {
            let ingredientQuantity = new IngredientQuantity();
            ingredientQuantity.ingredient = data.ingredient;
            ingredientQuantity.quantity = 1;
            this.meal.recipe.ingredients.push(ingredientQuantity);
        }
    }

    deleteIngredientFromFree(ingredientQuantity: IngredientQuantity) {
        this.meal.recipe.ingredients = this.meal.recipe.ingredients.filter(i => i !== ingredientQuantity);
    }
}
