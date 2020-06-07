import { Component } from '@angular/core';
import { AbstractPageableSelectorComponent } from "../abstract-pageable-selector.component";
import { NgControl } from "@angular/forms";
import { Group } from "@models/group.model";
import { GroupRestService } from "@mainServices/group-rest.service";

@Component({
  selector: 'menus-group-selector',
  templateUrl: './group-selector.component.html',
  styleUrls: ['./group-selector.component.less']
})
export class GroupSelectorComponent extends AbstractPageableSelectorComponent<Group> {

  constructor(
    private groupService: GroupRestService,
    public ngControl: NgControl
  ) {
    super();
    ngControl.valueAccessor = this;
  }

  load(isSetValue: boolean) {
    this.isLoading = true;
    this.groupService.getGroups(this.pager).subscribe(
      (data) => this.setContent(data, isSetValue)
    );
  }

  get isError() {
    return this.ngControl.invalid && this.ngControl.touched;
  }

}
