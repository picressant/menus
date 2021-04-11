import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { WeekMeal } from "@models/week-meal.model";
import { ActivatedRoute, Router } from "@angular/router";
import { WeekService } from "@services/week.service";
import { ActionSheetController, AlertController, ModalController, PopoverController } from "@ionic/angular";
import { WeekSelectRecipeModalComponent } from "../../components/week-select-recipe-modal/week-select-recipe-modal.component";
import { WeekSelectSideModalComponent } from "../../components/week-select-side-modal/week-select-side-modal.component";
import { IngredientQuantity } from "@models/ingredient-quantity.model";
import { BookRecipe } from "@models/book-recipe.model";
import { Recipe } from "@models/recipe.model";
import { IngredientModalSelectorComponent } from "@components/selectors/ingredient-modal-selector/ingredient-modal-selector.component";
import { RecipeRestService } from "@services/recipe-rest.service";
import { getMealDayStringified } from "@models/enums/meal-day.enum";
import { IngredientsQuantityListComponent } from "@components/lists/ingredients-quantity-list/ingredients-quantity-list.component";
import { OptionPopoverComponent } from "@components/popover/option-popover/option-popover.component";
import { SelectedIngredient } from "@models/selected-ingredient.model";

@Component({
    selector: 'app-modify-meal-page',
    templateUrl: './modify-meal-page.component.html',
    styleUrls: ['./modify-meal-page.component.scss']
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

    ingredientsRecipe: SelectedIngredient[] = [];
    ingredientsSides: SelectedIngredient[] = [];

    @ViewChild("ingredientListRecipe")
    private ingredientsQuantityList: IngredientsQuantityListComponent;

    constructor(
        private route: ActivatedRoute,
        private modalController: ModalController,
        private router: Router,
        private weekService: WeekService,
        private actionSheetController: ActionSheetController,
        private alertController: AlertController,
        private recipeRestController: RecipeRestService,
        private cdr: ChangeDetectorRef,
        private popoverController: PopoverController
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.mealIndex = params['index'];
            if (this.weekService.meals$.getValue()) {
                this.meal = this.weekService.meals$.getValue()[this.mealIndex];
                this.buildIngredients();
            }

            this.isEditing = true;
        });

        this.weekService.meals$.subscribe(meals => {
            if (!this.meal) {
                this.meal = meals[this.mealIndex];
                this.buildIngredients();
            }
        });
    }

    buildIngredients() {
        if (this.meal) {
            this.ingredientsRecipe = [];
            this.ingredientsSides = [];

            if (this.meal.recipe) {
                const persons = Recipe.isRecipeBook(this.meal.recipe) ? (this.meal.recipe as BookRecipe).persons : 1;
                const recipeRatio = Recipe.isRecipeFree(this.meal.recipe) ? 1 : this.meal.persons / persons;

                this.meal.recipe.selectedIngredients.forEach(i => {
                    const item = { ...i };
                    item.quantity = item.quantity * recipeRatio;
                    this.ingredientsRecipe.push(item);
                });
            }

            this.meal.sideDishes.forEach(side => {
                side.selectedIngredients.forEach(i => {
                    const item = { ...i };
                    item.quantity = item.quantity * this.meal.persons;

                    const index = this.ingredientsSides.findIndex(ing => ing.ingredient.id === i.ingredient.id);
                    if (index >= 0)
                        this.ingredientsSides[index].quantity += item.quantity;
                    else
                        this.ingredientsSides.push(item);
                });
            });
        }
    }

    submit() {
        if (this.isMealFreeRecipe)
            this.meal.recipe.selectedIngredients = this.ingredientsRecipe;

        this.weekService.updateMeal(this.meal, this.mealIndex);
        this.router.navigate([".."]);
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
            this.meal.persons = data.recipe.persons;
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

    editMeal() {
        if (this.isMealFreeRecipe)
            this.editFreeMeal();
        else
            this.selectBookRecipe();
    }

    showMeal() {
        if (this.meal && this.meal.recipe && !this.isMealFreeRecipe) {
            this.router.navigate(["main/recipe", this.meal.recipe.id]);
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
                    cssClass: 'color-medium',
                    handler: () => {
                    }
                }, {
                    text: 'Ok',
                    cssClass: 'color-dark',
                    handler: (alertData) => {
                        if (!this.meal)
                            this.meal = new WeekMeal();

                        if ((this.meal.recipe && !Recipe.isRecipeFree(this.meal.recipe)) || !this.meal.recipe)
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
            id: IngredientModalSelectorComponent.modalId,
            componentProps: {
                excludeIds: this.ingredientsRecipe.map(iq => iq.ingredient.id),
                focusSearchBar: true,
                canCreateIngredient: true
            }
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data.ingredient) {
            let selectedIngredient = new SelectedIngredient();
            selectedIngredient.ingredient = data.ingredient;
            selectedIngredient.unit = data.ingredient.unit;
            selectedIngredient.quantity = 1;
            this.ingredientsRecipe.push(selectedIngredient);

            this.cdr.detectChanges();

            setTimeout(() => {
                this.ingredientsQuantityList.focusQuantity(selectedIngredient.ingredient);
            }, 200);
        }
    }

    deleteIngredientFromFree(ingredientQuantity: IngredientQuantity) {
        this.ingredientsRecipe = this.ingredientsRecipe.filter(i => i !== ingredientQuantity);
    }

    getDay() {
        if (this.meal)
            return getMealDayStringified(this.meal.weekDayIndex);
    }

    async showOptions(event: any) {
        const options = [
            { clickedResult: "RECIPE", text: "Choisir une recette" },
            { clickedResult: "FREE", text: "Faire une saisie libre" }
        ];

        if (this.isMealFreeRecipe)
            options.push({ clickedResult: "TRANSFORM", text: "Transformer en recette" });

        const popover = await this.popoverController.create({
            component: OptionPopoverComponent,
            event: event,
            translucent: true,
            componentProps: {
                options
            }
        });
        await popover.present();

        const { data } = await popover.onWillDismiss();
        if (data && data.option) {
            if (data.option === "RECIPE")
                await this.selectBookRecipe();
            else if (data.option === "FREE") {
                await this.editFreeMeal();
            }
            else if (data.option === "TRANSFORM") {
                const state = {
                    recipe: this.meal.recipe,
                    persons: this.meal.persons,
                    weekIndex: this.meal.weekDayIndex
                }
                this.router.navigate(["main/recipe/add"], { state })
            }
        }
    }
}
