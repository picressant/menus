import { Component, Input, OnInit } from '@angular/core';
import { OptionPopoverData } from "@components/popover/option-popover/option-popover-data.model";
import { PopoverController } from "@ionic/angular";

@Component({
  selector: 'app-option-popover',
  templateUrl: './option-popover.component.html',
  styleUrls: ['./option-popover.component.scss'],
})
export class OptionPopoverComponent implements OnInit {

  @Input()
  options: OptionPopoverData[] = [];

  constructor(
      private popoverController: PopoverController
  ) { }

  ngOnInit() {}

  onClick(option: OptionPopoverData) {
    this.popoverController.dismiss({option: option.clickedResult});
  }

}
