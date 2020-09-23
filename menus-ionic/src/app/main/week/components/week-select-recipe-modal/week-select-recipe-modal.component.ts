import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { Recipe } from "@models/recipe.model";

@Component({
    selector: 'app-week-select-recipe-modal',
    templateUrl: './week-select-recipe-modal.component.html',
    styleUrls: ['./week-select-recipe-modal.component.scss'],
})
export class WeekSelectRecipeModalComponent implements OnInit {

    constructor(
        private modalController: ModalController
    ) {
    }

    ngOnInit() {

    }

    closeModal(recipe: Recipe) {
        this.modalController.dismiss({
            recipe
        });
    }
}
