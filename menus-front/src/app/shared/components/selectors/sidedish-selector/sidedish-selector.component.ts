import { Component } from '@angular/core';
import { AbstractPageableSelectorComponent } from "../abstract-pageable-selector.component";
import { NgControl } from "@angular/forms";
import { SideDish } from "../../../models/sidedish.model";
import { SideDishRestService } from "../../../../main/services/sidedish-rest.service";

@Component({
  selector: 'menus-sidedish-selector',
  templateUrl: './sidedish-selector.component.html',
  styleUrls: ['./sidedish-selector.component.less']
})
export class SidedishSelectorComponent extends AbstractPageableSelectorComponent<SideDish> {

  constructor(
    private sideDishService: SideDishRestService,
    public ngControl: NgControl
  ) {
    super();
    ngControl.valueAccessor = this;
  }

  load(isSetValue: boolean) {
    this.isLoading = true;
    this.sideDishService.getSideDishes(this.pager).subscribe(
      (data) => this.setContent(data, isSetValue)
    );
  }

  get isError() {
    return this.ngControl.invalid && this.ngControl.touched;
  }
}
