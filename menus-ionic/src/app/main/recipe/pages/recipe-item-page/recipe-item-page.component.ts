import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractItemPage } from "@pages/abstract-item-page";
import { Recipe } from "@models/recipe.model";
import { forkJoin, Observable } from "rxjs";
import { FormBuilder } from "@angular/forms";
import { RecipeRestService } from "@services/recipe-rest.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToasterService } from "@services/toaster.service";
import { AlertController, ModalController } from "@ionic/angular";
import { IngredientModalSelectorComponent } from "@components/selectors/ingredient-modal-selector/ingredient-modal-selector.component";
import { WeekService } from "@services/week.service";
import { tap } from "rxjs/operators";
import { removeFromArray } from "@helpers/remove-array-element.function";
import { ConfirmationAlertService } from "@services/confirmation-alert.service";
import { BookRecipe } from "@models/book-recipe.model";
import { IngredientsQuantityListComponent } from "@components/lists/ingredients-quantity-list/ingredients-quantity-list.component";
import { MealDay } from "@models/enums/meal-day.enum";
import { SelectedIngredient } from "@models/selected-ingredient.model";

@Component({
    selector: 'app-recipe-item-page',
    templateUrl: './recipe-item-page.component.html',
    styleUrls: ['./recipe-item-page.component.scss'],
})
export class RecipeItemPageComponent extends AbstractItemPage<Recipe> implements OnInit {

    fileUploadError = '';
    imgPreviewURL: any;
    storeCurrentImages: any;

    timestamp: string;

    footerOverview = {
        name: "Résumé",
        icon: "restaurant-outline",
        selectedTab: "tab-overview"
    }

    footerSteps = {
        name: "Étapes",
        icon: "list-circle-outline",
        selectedTab: "tab-steps"
    }

    footerIngredients = {
        name: "Ingrédients",
        icon: "nutrition-outline",
        selectedTab: "tab-ingredients"
    }

    selectedTab = this.footerOverview.selectedTab;
    isDeleting: number;

    @ViewChild(IngredientsQuantityListComponent)
    private ingredientListComponent: IngredientsQuantityListComponent;

    private fromWeekMealIndex: MealDay;

    constructor(private fb: FormBuilder,
                private recipeRest: RecipeRestService,
                private route: ActivatedRoute,
                private toaster: ToasterService,
                private router: Router,
                private modalController: ModalController,
                private weekService: WeekService,
                private alertController: AlertController,
                private cdr: ChangeDetectorRef,
                private confirmationService: ConfirmationAlertService
    ) {
        super(route, toaster, "Recette modifiée avec succès", "Recette ajoutée avec succès");
        this.form = BookRecipe.form(this.fb);
    }

    ngOnInit() {
        super.ngOnInit();
        const state = this.router.getCurrentNavigation().extras.state;
        if (state) {
            this.form.reset(state.recipe);
            this.form.controls.id.setValue(null);
            this.form.controls.jacksonType.setValue(BookRecipe.JACKSON_TYPE);
            this.form.controls.persons.setValue(state.persons);
            this.fromWeekMealIndex = state.weekIndex;
        }
        else {
            this.fromWeekMealIndex = null;
        }
    }

    get title(): string {
        return this.isAddingMode ? "Ajouter une recette" : (!this.data) ? "" : this.data.name;
    }

    get get$(): Observable<Recipe> {
        return this.recipeRest.getRecipe(this.id);
    }

    get create$(): Observable<Recipe> {
        return this.recipeRest.addRecipe(this.form.value).pipe(
            tap((recipe: BookRecipe) => {
                if (this.fromWeekMealIndex) {
                    const index = this.weekService.findMealIndex(this.fromWeekMealIndex);
                    const meal = this.weekService.meals$.getValue()[index];
                    meal.recipe = recipe;
                    meal.persons = recipe.persons;
                    this.weekService.updateMeal(meal, index);
                }
            })
        );
    }

    get save$(): Observable<Recipe> {
        return this.recipeRest.updateRecipe(this.form.value)
            .pipe(tap(() => {
                if (this.weekService.meals$.getValue().filter(meal => meal.recipe && meal.recipe.id === this.id).length > 0) {
                    this.weekService.getWeekFromApi();
                }
            }));
    }


    postCreate() {
        if (this.imgPreviewURL != null) {
            this.recipeRest.storePicture(this.id, this.storeCurrentImages[0]).subscribe(() => {
                this.timestamp = new Date().getTime().toString();
                this.imgPreviewURL = null;
                this.storeCurrentImages = null;
            });
        }
    }

    _save() {
        if (this.imgPreviewURL != null) {
            forkJoin([
                this.recipeRest.storePicture(this.id, this.storeCurrentImages[0]),
                this.save$
            ]).subscribe(([res, recipe]) => {
                this.imgPreviewURL = null;
                this.storeCurrentImages = null;
                this.toaster.info(this.saveToast);
                this.resetForm(recipe);
            });
        }
        else {
            this.save$.subscribe(
                (recipe: BookRecipe) => {
                    this.resetForm(recipe);
                    this.toaster.info(this.saveToast);
                }
            );
        }
    }


    select(tabId: string) {
        this.selectedTab = tabId;
    }


    preview(files) {
        if (files.length === 0) {
            return;
        }

        const mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.fileUploadError = 'Le fichier doit être une image';
            this.toaster.error(this.fileUploadError);
            return;
        }

        const reader = new FileReader();
        this.storeCurrentImages = files;
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.imgPreviewURL = reader.result;
        };
    }

    get imgStyles() {
        return {
            width: '200px',
            height: '200px',
            'border-radius': '10px',
            'object-fit': 'cover'
        };
    }

    async addIngredient() {
        if (!this.isReadonly) {
            const modal = await this.modalController.create({
                component: IngredientModalSelectorComponent,
                id: IngredientModalSelectorComponent.modalId,
                componentProps: {
                    "excludeIds": this.form.controls.selectedIngredients.value.map(iq => iq.ingredient.id),
                    "focusSearchBar": true,
                    "canCreateIngredient": true
                }
            });

            await modal.present();

            const { data } = await modal.onWillDismiss();
            if (data.ingredient) {
                let selectedIngredient = new SelectedIngredient();
                selectedIngredient.ingredient = data.ingredient;
                selectedIngredient.unit = data.ingredient.units[data.ingredient.starredUnitIndex];
                selectedIngredient.quantity = 1;
                this.form.controls.selectedIngredients.value.push(selectedIngredient);
                this.form.controls.selectedIngredients.setValue(this.form.controls.selectedIngredients.value.sort((a, b) => a.ingredient.name.localeCompare(b.ingredient.name)));

                setTimeout(() => this.ingredientListComponent.focusQuantity(selectedIngredient.ingredient), 200);
            }
        }
    }

    onDeleteIngredient(selectedIngredient: SelectedIngredient) {
        this.form.controls.selectedIngredients.setValue(this.form.controls.selectedIngredients.value.filter(i => i !== selectedIngredient));
    }

    async delete() {
        const alert = await this.alertController.create({
            header: 'Confirmation',
            cssClass: 'confirmation-modal',
            message: 'Supprimer cette recette ?',
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                    cssClass: 'color-medium'
                }, {
                    cssClass: 'color-dark',
                    text: 'Okay',
                    handler: () => {
                        this.recipeRest.deleteRecipe(this.id).subscribe(() => {
                            this.weekService.getWeekFromApi();
                            this.router.navigate(["/main/recipe"]);
                        });
                    }
                }
            ]
        });

        await alert.present();
    }

    addStep() {
        let steps: string[] = this.form.value.steps;
        if (!steps)
            steps = [];
        steps.push("");
        this.form.controls.steps.setValue(steps);
    }

    removeStep(step: string) {
        if (!this.isReadonly) {
            this.confirmationService.confirm("Supprimer l'étape ?", () => {
                removeFromArray(this.form.value.steps, step);
            });
        }
    }

    changeStep(event: any, index: number) {
        this.form.value.steps[index] = event.detail.value;
    }

    refreshWiggleEffect(i: number) {
        if (!this.isReadonly) {
            this.isDeleting = i;
            this.cdr.detectChanges();
        }
    }

    trackByFn(index: any, item: any) {
        return index;
    }
}
