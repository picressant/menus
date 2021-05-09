import { Component, OnInit, ViewChild } from '@angular/core';
import { IngredientRestService } from "@services/ingredient-rest.service";
import { Unit } from "@models/unit.model";
import { UnitListComponent } from "../../components/unit-list/unit-list.component";
import { ModalController } from "@ionic/angular";
import { UnitModalComponent } from "../../components/unit-modal/unit-modal.component";
import { ShopSection } from "@models/shop-section.model";
import { ShopSectionModalComponent } from "../../components/shop-section-modal/shop-section-modal.component";
import { ShopSectionListComponent } from "../../components/shop-section-list/shop-section-list.component";
import { ShopSectionRestService } from "@services/shop-section-rest.service";
import { ConversionListComponent } from "../../components/conversion-list/conversion-list.component";
import { ConversionModalComponent } from "../../components/conversion-modal/conversion-modal.component";
import { ConvertTo } from "@models/convert-to.model";

@Component({
    selector: 'app-paramters-page',
    templateUrl: './parameters-page.component.html',
    styleUrls: ['./parameters-page.component.scss'],
})
export class ParametersPageComponent implements OnInit {

    @ViewChild(UnitListComponent)
    private unitListComponent: UnitListComponent;

    @ViewChild(ShopSectionListComponent)
    private shopSectionListComponent: ShopSectionListComponent;

    @ViewChild(ConversionListComponent)
    private conversionListComponent: ConversionListComponent;

    footerUnit = {
        name: "Unités",
        icon: "flask-outline",
        selectedTab: "tab-unit"
    }

    footerConversion = {
        name: "Conversions",
        icon: "swap-horizontal-outline",
        selectedTab: "tab-conv"
    }

    footerShopSections = {
        name: "Rayons",
        icon: "file-tray-full-outline",
        selectedTab: "tab-section"
    }

    selectedTab: string = this.footerUnit.selectedTab;

    shopSections: ShopSection[] = [];

    constructor(
        private ingredientRest: IngredientRestService,
        private shopSectionRest: ShopSectionRestService,
        private modalController: ModalController
    ) {
    }

    ngOnInit() {
        this.loadShopSections();
    }

    private loadShopSections() {
        this.shopSectionRest.getAllShopSections().subscribe(sections => this.shopSections = sections);
    }

    async onAdd() {
        if (this.selectedTab === this.footerUnit.selectedTab)
            await this.addUnit();
        else if (this.selectedTab === this.footerShopSections.selectedTab)
            await this.addSection();
        else if (this.selectedTab === this.footerConversion.selectedTab)
            await this.addConversion();
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
            this.shopSectionRest.addShopSection(data.section).subscribe(() => {
                this.shopSectionListComponent.refresh(null);
                this.loadShopSections();
            });

        }
    }

    async addConversion() {
        const modal = await this.modalController.create({
            component: ConversionModalComponent,
            id: ConversionModalComponent.modalId
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data && data.conversion) {
            this.ingredientRest.addConversion(data.conversion).subscribe(() => {
                this.conversionListComponent.refresh(null);
            });

        }
    }


    doRefresh(event: any) {
        if (this.selectedTab === this.footerUnit.selectedTab)
            this.unitListComponent.refresh(event);
        else if (this.selectedTab === this.footerShopSections.selectedTab)
            this.shopSectionListComponent.refresh(event);
        else if (this.selectedTab === this.footerConversion.selectedTab)
            this.conversionListComponent.refresh(event);
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
            this.shopSectionRest.saveShopSection(data.section).subscribe(() => {
                this.shopSectionListComponent.refresh(null);
                this.loadShopSections();
            });
        }
    }

    async showConversion(convertTo: ConvertTo) {
        const modal = await this.modalController.create({
            component: ConversionModalComponent,
            id: ConversionModalComponent.modalId,
            componentProps: {
                "conversion": convertTo
            }
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data && data.conversion) {
            this.ingredientRest.saveConversion(data.conversion).subscribe(() => {
                this.conversionListComponent.refresh(null);
            });
        }
    }
}
