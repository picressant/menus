import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { ShopSection } from "@models/shop-section.model";

@Component({
    selector: 'app-shop-section-modal',
    templateUrl: './shop-section-modal.component.html',
    styleUrls: ['./shop-section-modal.component.scss'],
})
export class ShopSectionModalComponent implements OnInit {

    form: FormGroup

    @Input()
    set section(section: ShopSection) {
        this.form.reset(section);
    }

    constructor(private formBuilder: FormBuilder,
                private modalController: ModalController) {
        this.form = ShopSection.form(this.formBuilder);
    }

    ngOnInit() {
    }

    closeModal() {
        this.modalController.dismiss({ section: this.form.value });
    }

    forceCloseModal() {
        this.modalController.dismiss();
    }

}
