import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from "../../../../shared/services/confirmation.service";
import { Router } from "@angular/router";
import { Group } from "@models/group.model";
import { GroupRestService } from "../../../services/group-rest.service";
import { AbstractTableComponent } from "../../../../shared/components/table/abstract-table.component";
import { Observable } from "rxjs";
import { Pageable } from "@models/pager/pageable.model";

@Component({
  selector: 'menus-group-table',
  templateUrl: './group-table.component.html',
  styleUrls: ['./group-table.component.less']
})
export class GroupTableComponent extends AbstractTableComponent<Group> implements OnInit {

  constructor(
    private groupService: GroupRestService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {
    super();
  }

  edit(group: Group) {
    this.router.navigate(['main/user/group', group.id]);
  }

  delete(group: Group) {
    this.confirmationService.confirm("Cette suppression est définitive. Continuer ?").subscribe(
      (res: boolean) => {
        if (res) {
          this.groupService.deleteGroup(group.id).subscribe(() => {
            this.load();
          });
        }
      }
    );
  }

  add() {
    this.router.navigate(['main/user/group/add']);
  }

  get displayedColumns(): string[] {
    return ['name', 'actions'];
  }

  get getData$(): Observable<Pageable<Group>> {
    return this.groupService.getGroups(this.pager);
  }

}
