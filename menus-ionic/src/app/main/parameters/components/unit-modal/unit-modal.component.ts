import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Unit } from '@models/unit.model';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-unit-modal',
    templateUrl: './unit-modal.component.html',
    styleUrls: ['./unit-modal.component.scss'],
})
export class UnitModalComponent implements OnInit {

    form: UntypedFormGroup;

    @Input()
    set unit(unit: Unit) {
        this.form.reset(unit);
    }

    constructor(private formBuilder: UntypedFormBuilder,
                private modalController: ModalController) {
        this.form = Unit.form(this.formBuilder);
    }

    ngOnInit() {
    }

    closeModal() {
        this.modalController.dismiss({ unit: this.form.value });
    }

    forceCloseModal() {
        this.modalController.dismiss();
    }
}
