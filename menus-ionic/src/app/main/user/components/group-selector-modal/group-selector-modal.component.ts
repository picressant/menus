import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { Group } from "@models/group.model";

@Component({
    selector: 'app-group-selector-modal',
    templateUrl: './group-selector-modal.component.html',
    styleUrls: ['./group-selector-modal.component.scss'],
})
export class GroupSelectorModalComponent implements OnInit {

    constructor(
        private modalController: ModalController
    ) {
    }

    ngOnInit() {
    }

    closeModal(group: Group) {
        this.modalController.dismiss({ group });
    }
}
