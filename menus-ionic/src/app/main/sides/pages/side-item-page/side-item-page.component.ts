import { Component, ViewChild } from '@angular/core';
import { AbstractItemPage } from "@pages/abstract-item-page";
import { Observable } from "rxjs";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToasterService } from "@services/toaster.service";
import { SideDish } from "@models/sidedish.model";
import { SideDishRestService } from "@services/sidedish-rest.service";
import { WeekService } from "@services/week.service";
import { tap } from "rxjs/operators";
import { IngredientQuantity } from "@models/ingredient-quantity.model";
import { IngredientModalSelectorComponent } from "@components/selectors/ingredient-modal-selector/ingredient-modal-selector.component";
import { AlertController, ModalController } from "@ionic/angular";
import { IngredientsQuantityListComponent } from "@components/lists/ingredients-quantity-list/ingredients-quantity-list.component";

@Component({
    selector: 'app-side-item-page',
    templateUrl: './side-item-page.component.html',
    styleUrls: ['./side-item-page.component.scss'],
})
export class SideItemPageComponent extends AbstractItemPage<SideDish> {

    @ViewChild(IngredientsQuantityListComponent)
    private ingredientsQuantityList: IngredientsQuantityListComponent;

    constructor(private fb: FormBuilder,
                private sideRest: SideDishRestService,
                private router: Router,
                private route: ActivatedRoute,
                private toaster: ToasterService,
                private weekService: WeekService,
                private modalController: ModalController,
                private alertController: AlertController
    ) {

        super(route, toaster, "Accompagnement modifié avec succès", "Accompagnement ajouté avec succès");
        this.form = SideDish.form(this.fb);
    }


    get title(): string {
        return this.isAddingMode ? "Ajouter un accompagnement" : (!this.data) ? "" : this.data.name;
    }

    get create$(): Observable<SideDish> {
        return this.sideRest.addSide(this.form.value);
    }

    get get$(): Observable<SideDish> {
        return this.sideRest.getSide(this.id);
    }

    get save$(): Observable<SideDish> {
        return this.sideRest.saveSide(this.form.value)
            .pipe(tap(() => this.weekService.getWeekFromApi()));
    }

    onDeleteIngredient(ingredientQuantity: IngredientQuantity) {
        this.form.controls.ingredients.setValue(this.form.controls.ingredients.value.filter(i => i !== ingredientQuantity));
    }

    async addIngredient() {
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

                setTimeout(() => this.ingredientsQuantityList.focusQuantity(ingredientQuantity.ingredient), 200);
            }
        }
    }

    async delete() {
        const alert = await this.alertController.create({
            header: 'Confirmation',
            cssClass: 'confirmation-modal',
            message: 'Supprimer cet accompagnement ?',
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                    cssClass: 'color-medium'
                }, {
                    cssClass: 'color-dark',
                    text: 'Okay',
                    handler: () => {
                        this.sideRest.deleteSide(this.id).subscribe(() => {
                            this.weekService.getWeekFromApi();
                            this.router.navigate(["/main/side"]);
                        });
                    }
                }
            ]
        });

        await alert.present();
    }
}
