import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { ConvertTo } from "@models/convert-to.model";
import { SelectUnitModalComponent } from "@components/modals/select-unit-modal/select-unit-modal.component";

@Component({
    selector: 'app-conversion-modal',
    templateUrl: './conversion-modal.component.html',
    styleUrls: ['./conversion-modal.component.scss'],
})
export class ConversionModalComponent implements OnInit {

    form: FormGroup;

    public static modalId = "ConversionModalComponent_ID";

    @Input()
    set conversion(convertTo: ConvertTo) {
        this.form.reset(convertTo);
    }

    constructor(private formBuilder: FormBuilder,
                private modalController: ModalController,
                private innerModalController: ModalController) {
        this.form = ConvertTo.form(this.formBuilder);
    }

    ngOnInit() {
    }

    closeModal() {
        this.modalController.dismiss({ conversion: this.form.value }, null, ConversionModalComponent.modalId);
    }

    forceCloseModal() {
        this.modalController.dismiss({}, null, ConversionModalComponent.modalId);
    }

    async onChooseUnitA() {
        const excludeIds = [];
        if (this.form.controls.unitTo.value)
            excludeIds.push(this.form.controls.unitTo.value.id);
        this.chooseUnit(excludeIds).then(unit => {
            this.form.controls.unitFrom.setValue(unit);
        })
    }

    async onChooseUnitB() {
        const excludeIds = [];
        if (this.form.controls.unitFrom.value)
            excludeIds.push(this.form.controls.unitFrom.value.id);
        this.chooseUnit(excludeIds).then(unit => {
            this.form.controls.unitTo.setValue(unit);
        })    }

    async chooseUnit(excludeIds: string[]) {
        const modal = await this.innerModalController.create({
            component: SelectUnitModalComponent,
            id: SelectUnitModalComponent.modalId,
            componentProps: {
                excludeIds: excludeIds
            }
        });

        await modal.present();

        const { data } = await modal.onWillDismiss();
        if (data && data.unit) {
            return data.unit;
        }
        return null;
    }


}
