import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { Ingredient } from "@models/ingredient.model";
import { SelectUnitModalComponent } from "../select-unit-modal/select-unit-modal.component";
import { ShopSectionRestService } from "@services/shop-section-rest.service";
import { ShopSection } from "@models/shop-section.model";

@Component({
    selector: 'app-ingredient-modal',
    templateUrl: './ingredient-modal.component.html',
    styleUrls: ['./ingredient-modal.component.scss'],
})
export class IngredientModalComponent {

    form: FormGroup

    @Input()
    set ingredient(ingredient: Ingredient) {
        this.form.reset(ingredient);
    }

    @Input()
    shopSections: ShopSection[] = [];

    constructor(private formBuilder: FormBuilder,
                private modalController: ModalController,
                private innerModalController: ModalController) {
        this.form = Ingredient.form(this.formBuilder);
    }

    async onChooseUnit() {
        const modal = await this.innerModalController.create({
            component: SelectUnitModalComponent
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data && data.unit) {
            this.form.controls.unit.setValue(data.unit);
        }
    }

    closeModal() {
        this.modalController.dismiss({ ingredient: this.form.value });
    }

    forceCloseModal() {
        this.modalController.dismiss();
    }

    compareWithFn = (o1, o2) => {
        return o1 && o2 ? o1.id === o2.id : o1 === o2;
    };
    compareWith = this.compareWithFn;
}
