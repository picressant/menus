import { Component, OnInit, ViewChild } from '@angular/core';
import { IngredientRestService } from "@services/ingredient-rest.service";
import { Unit } from "@models/unit.model";
import { UnitListComponent } from "../../components/unit-list/unit-list.component";
import { ModalController } from "@ionic/angular";
import { UnitModalComponent } from "../../components/unit-modal/unit-modal.component";
import { Ingredient } from "@models/ingredient.model";
import { IngredientListComponent } from "@components/lists/ingredient-list/ingredient-list.component";
import { IngredientModalComponent } from "../../components/ingredient-modal/ingredient-modal.component";
import { ShopSection } from "@models/shop-section.model";
import { ShopSectionModalComponent } from "../../components/shop-section-modal/shop-section-modal.component";
import { ShopSectionListComponent } from "../../components/shop-section-list/shop-section-list.component";
import { ShopSectionRestService } from "@services/shop-section-rest.service";

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

    @ViewChild(ShopSectionListComponent)
    private shopSectionListComponent: ShopSectionListComponent;

    footerIngredient = {
        name: "Ingrédients",
        icon: "nutrition-outline",
        selectedTab: "nutrition-ingredient"
    }

    footerUnit = {
        name: "Unités",
        icon: "flask-outline",
        selectedTab: "tab-unit"
    }

    footerShopSections = {
        name: "Rayons",
        icon: "file-tray-full-outline",
        selectedTab: "tab-section"
    }

    selectedTab: string = this.footerIngredient.selectedTab;

    constructor(
        private ingredientRest: IngredientRestService,
        private shopSectionRest: ShopSectionRestService,
        private modalController: ModalController
    ) {
    }

    ngOnInit() {
    }

    async onAdd() {
        if (this.selectedTab === this.footerUnit.selectedTab)
            await this.addUnit();
        else if (this.selectedTab === this.footerIngredient.selectedTab)
            await this.addIngredient();
        else
            await this.addSection();
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

    async addSection() {
        const modal = await this.modalController.create({
            component: ShopSectionModalComponent
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data && data.section) {
            this.shopSectionRest.addShopSection(data.section).subscribe(() => this.shopSectionListComponent.refresh(null));
        }
    }


    doRefresh(event: any) {
        if (this.selectedTab === this.footerUnit.selectedTab)
            this.unitListComponent.refresh(event);
        else if (this.selectedTab === this.footerIngredient.selectedTab)
            this.ingredientListComponent.refresh(event);
        else
            this.shopSectionListComponent.refresh(event);
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

    async showSection(section: ShopSection) {
        const modal = await this.modalController.create({
            component: ShopSectionModalComponent,
            componentProps: {
                "section": section
            }
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data && data.section) {
            this.shopSectionRest.saveShopSection(data.section).subscribe(() => this.shopSectionListComponent.refresh(null));
        }
    }
}
