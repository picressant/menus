import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { Ingredient } from "@models/ingredient.model";
import { IngredientListComponent } from "@components/lists/ingredient-list/ingredient-list.component";

@Component({
    selector: 'app-ingredient-modal-selector',
    templateUrl: './ingredient-modal-selector.component.html',
    styleUrls: ['./ingredient-modal-selector.component.scss'],
})
export class IngredientModalSelectorComponent implements OnInit {

    @ViewChild(IngredientListComponent)
    private ingredientList: IngredientListComponent;

    @Input()
    excludeIds: string[] = [];

    constructor(
        private modalController: ModalController,
    ) {
    }

    ngOnInit() {
    }

    closeModal(ingredient: Ingredient) {
        this.modalController.dismiss({
            'ingredient': ingredient
        });
    }
}
