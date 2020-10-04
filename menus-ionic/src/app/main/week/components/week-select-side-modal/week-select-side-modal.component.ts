import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SideDish } from "@models/sidedish.model";
import { Pager } from "@models/pager/pager.model";
import { Pageable } from "@models/pager/pageable.model";
import { IonInfiniteScroll, ModalController } from "@ionic/angular";

@Component({
    selector: 'app-week-select-side-modal',
    templateUrl: './week-select-side-modal.component.html',
    styleUrls: ['./week-select-side-modal.component.scss'],
})
export class WeekSelectSideModalComponent implements OnInit {

    @Input()
    sidesId: string[] = [];

    constructor(
        private modalController: ModalController) {
    }

    ngOnInit() {
    }

    closeModal(side: SideDish) {
        this.modalController.dismiss({
            'side': side
        });
    }
}
