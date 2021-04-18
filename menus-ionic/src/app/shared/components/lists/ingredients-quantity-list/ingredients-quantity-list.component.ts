import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IngredientModalSelectorComponent } from "@components/selectors/ingredient-modal-selector/ingredient-modal-selector.component";
import { AlertController, ModalController } from "@ionic/angular";
import { Ingredient } from "@models/ingredient.model";
import { SelectedIngredient } from "@models/selected-ingredient.model";

@Component({
    selector: 'app-ingredients-quantity-list',
    templateUrl: './ingredients-quantity-list.component.html',
    styleUrls: ['./ingredients-quantity-list.component.scss'],
})
export class IngredientsQuantityListComponent implements OnInit {

    @Input()
    isReadonly: boolean;

    @Input()
    set selectedIngredients(list: SelectedIngredient[]) {
        this._selectedIngredients = list;
        this.sortList();
    }

    get selectedIngredients(): SelectedIngredient[] {
        return this._selectedIngredients;
    }

    private _selectedIngredients: SelectedIngredient[];

    @Output()
    delete = new EventEmitter<SelectedIngredient>();

    constructor(
        private modalController: ModalController,
        private alertController: AlertController,
        private el: ElementRef
    ) {
    }

    ngOnInit() {
    }


    async changeIngredient(i: number) {
        if (!this.isReadonly) {
            const modal = await this.modalController.create({
                component: IngredientModalSelectorComponent,
                id: IngredientModalSelectorComponent.modalId,
                componentProps: {
                    "excludeIds": this.selectedIngredients.map(iq => iq.ingredient.id)
                }
            });

            await modal.present();

            const { data } = await modal.onWillDismiss();
            if (data.ingredient) {
                this.selectedIngredients[i].ingredient = data.ingredient;
            }
        }
    }

    deleteIngredient(selectedIngredient: SelectedIngredient) {
        this.delete.emit(selectedIngredient);
    }

    private sortList() {
        this._selectedIngredients = this._selectedIngredients.sort((a, b) => a.ingredient.name.localeCompare(b.ingredient.name));
    }

    focusQuantity(ingredient: Ingredient) {
        this.el.nativeElement.querySelector("#ingredient_" + ingredient.id).focus();
    }

    async changeUnit(selectedIngredient: SelectedIngredient) {
        if (selectedIngredient.ingredient.units.length > 1) {
            let inputs = [];
            selectedIngredient.ingredient.units.forEach(u => {
                inputs.push({
                    name: 'ingredient',
                    type: 'radio',
                    label: u.name + ' (' + u.symbol + ')',
                    value: u,
                    checked: u.id === selectedIngredient.unit.id
                });
            });
            const alert = await this.alertController.create({
                header: 'Choisir une unité',
                inputs: inputs,
                buttons: [
                    {
                        text: 'Annuler',
                        role: 'cancel',
                        handler: () => {
                        }
                    }, {
                        text: 'Valider',
                        cssClass: "color-dark",
                        handler: (alertData) => {
                            selectedIngredient.unit = alertData;
                        }
                    }
                ]
            });

            await alert.present();
        }
    }

}
