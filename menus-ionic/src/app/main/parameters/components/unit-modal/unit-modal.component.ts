import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Unit } from "@models/unit.model";
import { ModalController } from "@ionic/angular";

@Component({
    selector: 'app-unit-modal',
    templateUrl: './unit-modal.component.html',
    styleUrls: ['./unit-modal.component.scss'],
})
export class UnitModalComponent implements OnInit {

    form: FormGroup

    @Input()
    set unit(unit: Unit) {
        this.form.reset(unit);
    }

    constructor(private formBuilder: FormBuilder,
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
