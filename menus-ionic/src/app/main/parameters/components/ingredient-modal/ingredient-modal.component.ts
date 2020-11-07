import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { Ingredient } from "@models/ingredient.model";
import { UnitModalComponent } from "../unit-modal/unit-modal.component";
import { SelectUnitModalComponent } from "../select-unit-modal/select-unit-modal.component";

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

}
