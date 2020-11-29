import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToasterService } from "@services/toaster.service";
import { Observable } from "rxjs";
import { AbstractItemPage } from "@pages/abstract-item-page";
import { Group } from "@models/group.model";
import { GroupRestService } from "@services/group-rest.service";
import { User } from "@models/user.model";
import { tap } from "rxjs/operators";

@Component({
    selector: 'app-group-item-page',
    templateUrl: './group-item-page.component.html',
    styleUrls: ['./group-item-page.component.scss'],
})
export class GroupItemPageComponent extends AbstractItemPage<Group> implements OnInit {

    members: User[] = [];

    constructor(private fb: FormBuilder,
                private groupRest: GroupRestService,
                private router: Router,
                private route: ActivatedRoute,
                private toaster: ToasterService,
    ) {
        super(route, toaster, "Crew modifié avec succès", "Crew ajouté avec succès");
        this.form = Group.form(this.fb);
    }


    get title(): string {
        return this.isAddingMode ? "Ajouter un groupe" : (!this.data) ? "" : this.data.name;
    }

    get create$(): Observable<Group> {
        return this.groupRest.addGroup(this.form.value);
    }

    get get$(): Observable<Group> {
        return this.groupRest.getGroup(this.id)
            .pipe(tap(g => this.groupRest.getMembers(g.id).subscribe(res => this.members = res)));
    }

    get save$(): Observable<Group> {
        return this.groupRest.updateGroup(this.form.value);
    }
}
