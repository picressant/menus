import { Component, OnInit } from '@angular/core';
import { AbstractItemPage } from "../../../../shared/components/pages/abstract-item-page";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToasterService } from "../../../../shared/services/toaster.service";
import { Observable } from "rxjs";
import { Group } from "@models/group.model";
import { GroupRestService } from "../../../services/group-rest.service";
import { User } from "@models/user.model";
import { tap } from "rxjs/operators";

@Component({
  selector: 'menus-group-item-page',
  templateUrl: './group-item-page.component.html',
  styleUrls: ['./group-item-page.component.less']
})
export class GroupItemPageComponent extends AbstractItemPage<Group> implements OnInit {

  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toaster: ToasterService,
    private router: Router,
    private groupService: GroupRestService
  ) {
    super(route, toaster, 'Groupe sauvegardé avec succès', 'Group créé avec succès');
    this.form = Group.form(this.fb);
  }

  get create$(): Observable<Group> {
    return this.groupService.addGroup(this.form.value);
  }

  get get$(): Observable<Group> {
    return this.groupService.getGroup(this.id)
      .pipe(
        tap((group: Group) => {
          this.groupService.getGroupUser(group.id).subscribe(users => this.users = users);
        })
      );
  }

  onCancelAdd() {
    this.router.navigate(['/main/user'])
  }

  get save$(): Observable<Group> {
    return this.groupService.updateGroup(this.form.value);
  }

}
