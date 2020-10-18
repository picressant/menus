import { Component, OnInit, ViewChild } from '@angular/core';
import { Group } from "@models/group.model";
import { UserListComponent } from "../../components/user-list/user-list.component";
import { GroupListComponent } from "../../components/group-list/group-list.component";
import { User } from "@models/user.model";
import { Router } from "@angular/router";

@Component({
    selector: 'app-user-list-page',
    templateUrl: './user-list-page.component.html',
    styleUrls: ['./user-list-page.component.scss'],
})
export class UserListPageComponent implements OnInit {

    @ViewChild(UserListComponent)
    private userListComponent: UserListComponent;

    @ViewChild(GroupListComponent)
    private groupListComponent: GroupListComponent;


    footerUser = {
        name: "Utilisateurs",
        icon: "person-outline",
        selectedTab: "tab-user"
    }

    footerGroup = {
        name: "Groupes",
        icon: "people-outline",
        selectedTab: "tab-group"
    }

    selectedTab: string = this.footerUser.selectedTab;

    constructor(
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.userListComponent.refresh(null);
        this.groupListComponent.refresh(null);
    }

    onClickGroup(group: Group) {
        this.router.navigate(['main/user/group', group.id]);
    }

    onClickUser(user: User) {
        this.router.navigate(['main/user', user.id], { queryParams: { isFromList: 'true' } });
    }

    doRefresh(event: any) {
      if (this.selectedTab === this.footerGroup.selectedTab)
        this.groupListComponent.refresh(event);
      else
        this.userListComponent.refresh(event);
    }

  onAdd() {
    if (this.selectedTab === this.footerUser.selectedTab) {
        this.router.navigate(['main/user/add'], { queryParams: { isFromList: 'true' } })
    }
    else {
        this.router.navigate(['main/user/group/add']);
    }
  }
}
