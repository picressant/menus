import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { Unit } from "@models/unit.model";

@Component({
  selector: 'app-select-unit-modal',
  templateUrl: './select-unit-modal.component.html',
  styleUrls: ['./select-unit-modal.component.scss'],
})
export class SelectUnitModalComponent implements OnInit {

  public static modalId: "SelectUnitModalComponent_ID";

  @Input()
  public excludeIds: string[];

  constructor(
      private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  closeModal(unit: Unit) {
    this.modalController.dismiss({ unit: unit }, null, SelectUnitModalComponent.modalId);
  }
}
