import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { IonItemSliding, ModalController } from "@ionic/angular";
import { Ingredient } from "@models/ingredient.model";
import { SelectUnitModalComponent } from "../select-unit-modal/select-unit-modal.component";
import { ShopSection } from "@models/shop-section.model";

@Component({
    selector: 'app-ingredient-modal',
    templateUrl: './ingredient-modal.component.html',
    styleUrls: ['./ingredient-modal.component.scss'],
})
export class IngredientModalComponent {

    public static modalId = "IngredientModalComponent_ID";

    @Input()
    set ingredient(ingredient: Ingredient) {
        this.form.reset(ingredient);
        this.form.controls.units.setValue([...ingredient.units]);
    }

    @Input()
    set name(name: string) {
        this.form.controls.name.setValue(name);
    }

    @Input()
    set forRecipe(val: boolean) {
        this.form.controls.forRecipe.setValue(val);
    }

    @Input() shopSections: ShopSection[] = [];
    @Input() fromGrocery = false;

    public form: FormGroup

    constructor(private formBuilder: FormBuilder,
                private ingredientModalController: ModalController,
                private innerModalController: ModalController) {
        this.form = Ingredient.form(this.formBuilder);
    }

    async onChooseUnit() {
        const modal = await this.innerModalController.create({
            component: SelectUnitModalComponent,
            id: SelectUnitModalComponent.modalId,
            componentProps: {
                excludeIds: this.form.controls.units.value.map(unit => unit.id)
            }
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data && data.unit) {
            if (this.form.controls.units.value.length === 0)
                this.form.controls.starredUnitIndex.setValue(0);
            this.form.controls.units.value.push(data.unit);
            this.form.controls.units.setValue([...this.form.controls.units.value]);
        }
    }

    closeModal() {
        this.ingredientModalController.dismiss({ ingredient: this.form.value }, null, IngredientModalComponent.modalId);
    }

    forceCloseModal() {
        this.ingredientModalController.dismiss(null, null, IngredientModalComponent.modalId);
    }

    compareWithFn = (o1, o2) => {
        return o1 && o2 ? o1.id === o2.id : o1 === o2;
    };
    compareWith = this.compareWithFn;

    deleteUnit(i: number) {
        this.form.controls.units.value.splice(i, 1);
        this.form.controls.units.setValue([...this.form.controls.units.value]);
        if (i === this.form.controls.starredUnitIndex.value)
            this.form.controls.starredUnitIndex.setValue(0);
    }

    starUnit(i: number) {
        this.form.controls.starredUnitIndex.setValue(i);
    }

    onSwipe(swipper: IonItemSliding, i: number) {
        swipper.close();
        this.starUnit(i);
    }
}
