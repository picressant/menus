import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from "@ionic/angular";

@Component({
  selector: 'app-option-popover',
  templateUrl: './option-popover.component.html',
  styleUrls: ['./option-popover.component.scss'],
})
export class OptionPopoverComponent implements OnInit {

  constructor(
      private popoverController: PopoverController
  ) { }

  ngOnInit() {}

  click(clicked: string) {
    this.popoverController.dismiss({option: clicked});
  }
}
