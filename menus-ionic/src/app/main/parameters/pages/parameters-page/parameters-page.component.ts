import { Component, OnInit, ViewChild } from '@angular/core';
import { IngredientRestService } from "@services/ingredient-rest.service";
import { Unit } from "@models/unit.model";
import { UnitListComponent } from "../../components/unit-list/unit-list.component";
import { ModalController } from "@ionic/angular";
import { UnitModalComponent } from "../../components/unit-modal/unit-modal.component";
import { Ingredient } from "@models/ingredient.model";
import { IngredientListComponent } from "@components/lists/ingredient-list/ingredient-list.component";
import { IngredientModalComponent } from "../../components/ingredient-modal/ingredient-modal.component";

@Component({
    selector: 'app-paramters-page',
    templateUrl: './parameters-page.component.html',
    styleUrls: ['./parameters-page.component.scss'],
})
export class ParametersPageComponent implements OnInit {

    @ViewChild(UnitListComponent)
    private unitListComponent: UnitListComponent;

    @ViewChild(IngredientListComponent)
    private ingredientListComponent: IngredientListComponent;

    footerIngredient = {
        name: "Ingrédients",
        icon: "today-outline",
        selectedTab: "nutrition-ingredient"
    }

    footerUnit = {
        name: "Unités",
        icon: "flask-outline",
        selectedTab: "tab-unit"
    }

    selectedTab: string = this.footerIngredient.selectedTab;

    constructor(
        private ingredientRest: IngredientRestService,
        private modalController: ModalController
    ) {
    }

    ngOnInit() {
    }

    async onAdd() {
        if (this.selectedTab === this.footerUnit.selectedTab) {
            await this.addUnit();
        }
        else {
            await this.addIngredient();
        }
    }

    async addIngredient() {
        const modal = await this.modalController.create({
            component: IngredientModalComponent
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data && data.ingredient) {
            this.ingredientRest.addIngredient(data.ingredient).subscribe(() => this.ingredientListComponent.refresh(null));
        }
    }

    async addUnit() {
        const modal = await this.modalController.create({
            component: UnitModalComponent
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data && data.unit) {
            this.ingredientRest.addUnit(data.unit).subscribe(() => this.unitListComponent.refresh(null));
        }
    }

    doRefresh(event: any) {
        this.unitListComponent.refresh(event);
    }

    async showUnit(unit: Unit) {
        const modal = await this.modalController.create({
            component: UnitModalComponent,
            componentProps: {
                "unit": unit
            }
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data && data.unit) {
            this.ingredientRest.saveUnit(data.unit).subscribe(() => this.unitListComponent.refresh(null));
        }
    }

    async onClickIngredient(ingredient: Ingredient) {
        const modal = await this.modalController.create({
            component: IngredientModalComponent,
            componentProps: {
                ingredient
            }
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data && data.ingredient) {
            this.ingredientRest.saveIngredient(data.ingredient).subscribe(() => this.ingredientListComponent.refresh(null));
        }
    }
}
