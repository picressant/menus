import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Direction, Order, Pager } from "@models/pager/pager.model";
import { Pageable } from "@models/pager/pageable.model";
import { IonInfiniteScroll } from "@ionic/angular";
import { ConfirmationAlertService } from "@services/confirmation-alert.service";
import { removeFromArray } from "../../../../shared/helpers/remove-array-element.function";
import { User } from "@models/user.model";
import { UserRestService } from "@services/user-rest.service";

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
    users: User[] = [];

    private pager: Pager;
    private pageableUser: Pageable<User>;

    @Output()
    selected: EventEmitter<User> = new EventEmitter<User>();

    @ViewChild(IonInfiniteScroll)
    infiniteScroll: IonInfiniteScroll;

    @Input()
    excludeIds: string[];

    @Input()
    set loadOnInit(load: boolean) {
        if (load)
            this.refresh(null);
    }

    _loadOnInit: boolean = false;

    deleteIndex: number = -1;

    constructor(
        private userRest: UserRestService,
        private confirmationService: ConfirmationAlertService
    ) {
        this.pager = new Pager(20);
        this.pager.orders.push(new Order("name", Direction.ASC));
    }

    ngOnInit() {
        if (this._loadOnInit)
            this.refresh(null);
    }

    refresh(event: any) {
        this.pager.page = 0;
        this.users = [];
        this.loadUsers(event);
    }

    searchUsers(text: string) {
        this.pager.page = 0;
        this.pager.search = text;
        this.users = [];
        this.loadUsers(null);
    }

    scrollUsers(event) {
        if (this.pager.page < this.pageableUser.totalPages) {
            this.pager.page++;
            this.loadUsers(event);
        }
        else {
            event.component.disableInfiniteScroll();
        }
    }

    private loadUsers(event) {
        this.pager.excludeIds = this.excludeIds;
        this.userRest.getUsers(this.pager).subscribe((pageableResult: Pageable<User>) => {
            this.users = this.users.concat(pageableResult.content);
            this.pageableUser = pageableResult;
            this.toggleInfiniteScroll();

            if (event) {
                event.target.complete();
            }
        });
    }

    toggleInfiniteScroll() {
        this.infiniteScroll.disabled = (this.pager.page >= this.pageableUser.totalPages)
    }

    selectUser(user: User) {
        this.selected.emit(user);
    }

    deleteUser(user: User) {
        this.confirmationService.confirm("Supprimer l'utilisateur \"" + user.firstname + " " + user.lastname +  "\" ?", () => {
            this.userRest.deleteUser(user).subscribe(() => {
                removeFromArray(this.users, user)
            });
        });
    }
}
