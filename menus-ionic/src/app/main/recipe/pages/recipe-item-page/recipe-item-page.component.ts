import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from "util";
import { AbstractItemPage } from "../../../../shared/pages/abstract-item-page";
import { Recipe } from "@models/recipe.model";
import { forkJoin, Observable } from "rxjs";
import { FormBuilder } from "@angular/forms";
import { RecipeRestService } from "../../../services/recipe-rest.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToasterService } from "../../../../shared/services/toaster.service";
import { Ingredient } from "@models/ingredient.model";
import { Pager } from "@models/pager/pager.model";
import { Pageable } from "@models/pager/pageable.model";
import { ModalController } from "@ionic/angular";
import { IngredientModalSelectorComponent } from "../../../../shared/components/selectors/ingredient-modal-selector/ingredient-modal-selector.component";
import { IngredientQuantity } from "@models/ingredient-quantity.model";

@Component({
    selector: 'app-recipe-item-page',
    templateUrl: './recipe-item-page.component.html',
    styleUrls: ['./recipe-item-page.component.scss'],
})
export class RecipeItemPageComponent extends AbstractItemPage<Recipe> implements OnInit {

    selectedTab = "tab-overview";

    fileUploadError = '';
    imgPreviewURL: any;
    storeCurrentImages: any;

    timestamp: string;

    ingredients: Ingredient[] = [];
    pageableIngredients: Pageable<Ingredient>;
    pagerIngredients: Pager;

    constructor(private fb: FormBuilder,
                private recipeRest: RecipeRestService,
                private route: ActivatedRoute,
                private toaster: ToasterService,
                private router: Router,
                private modalController: ModalController) {

        super(route, toaster, "Recette modifiée avec succès", "Recette ajoutée avec succès");
        this.form = Recipe.form(this.fb);
        this.pagerIngredients = new Pager(20);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    get title(): string {
        return this.isAddingMode ? "Ajouter une recette" : isNullOrUndefined(this.data) ? "" : this.data.name;
    }

    get get$(): Observable<Recipe> {
        return this.recipeRest.getRecipe(this.id);
    }

    get create$(): Observable<Recipe> {
        return undefined;
    }

    get save$(): Observable<Recipe> {
        return this.recipeRest.updateRecipe(this.form.value);
    }


    postCreate() {
        if (this.imgPreviewURL != null) {
            this.recipeRest.storePicture(this.id, this.storeCurrentImages[0]).subscribe();
            this.timestamp = new Date().getTime().toString();
            this.imgPreviewURL = null;
            this.storeCurrentImages = null;
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
                (recipe: Recipe) => {
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

    async changeIngredient(i: number) {
        if (!this.isReadonly) {
            const modal = await this.modalController.create({
                component: IngredientModalSelectorComponent,
                componentProps: {
                    "excludeIds": this.form.controls.ingredients.value.map(iq => iq.ingredient.id)
                }
            });

            await modal.present();

            const { data } = await modal.onWillDismiss();
            if (data.ingredient) {
                this.form.controls.ingredients.value[i].ingredient = data.ingredient;
            }
        }
    }

    async addIngredientQuantity() {
        if (!this.isReadonly) {
            const modal = await this.modalController.create({
                component: IngredientModalSelectorComponent,
                componentProps: {
                    "excludeIds": this.form.controls.ingredients.value.map(iq => iq.ingredient.id)
                }
            });

            await modal.present();

            const { data } = await modal.onWillDismiss();
            if (data.ingredient) {
                let ingredientQuantity = new IngredientQuantity();
                ingredientQuantity.ingredient = data.ingredient;
                ingredientQuantity.quantity = 1;
                this.form.controls.ingredients.value.push(ingredientQuantity);
            }
        }
    }

    deleteIngredient(ingredientQuantity: IngredientQuantity) {
        this.form.controls.ingredients.setValue(this.form.controls.ingredients.value.filter(i => i !== ingredientQuantity));
    }
}
