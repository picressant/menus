import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Direction, Order, Pager } from "@models/pager/pager.model";
import { Pageable } from "@models/pager/pageable.model";
import { IonInfiniteScroll } from "@ionic/angular";
import { ConfirmationAlertService } from "@services/confirmation-alert.service";
import { removeFromArray } from "../../../../shared/helpers/remove-array-element.function";
import { Group } from "@models/group.model";
import { GroupRestService } from "@services/group-rest.service";

@Component({
    selector: 'app-group-list',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit {

    groups: Group[] = [];

    private pager: Pager;
    private pageableGroups: Pageable<Group>;

    @Output()
    selected: EventEmitter<Group> = new EventEmitter<Group>();

    @ViewChild(IonInfiniteScroll)
    infiniteScroll: IonInfiniteScroll;

    @Input()
    excludeIds: string[];

    @Input()
    deleteAuthorized = false;

    @Input()
    set loadOnInit(load: boolean) {
        if (load)
            this.refresh(null);
    }

    _loadOnInit: boolean = false;

    deleteIndex: number = -1;

    constructor(
        private groupRest: GroupRestService,
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
        this.groups = [];
        this.loadGroups(event);
    }

    searchGroups(text: string) {
        this.pager.page = 0;
        this.pager.search = text;
        this.groups = [];
        this.loadGroups(null);
    }

    scrollGroups(event) {
        if (this.pager.page < this.pageableGroups.totalPages) {
            this.pager.page++;
            this.loadGroups(event);
        }
        else {
            event.component.disableInfiniteScroll();
        }
    }

    private loadGroups(event) {
        this.pager.excludeIds = this.excludeIds;
        this.groupRest.getGroups(this.pager).subscribe((pageableResult: Pageable<Group>) => {
            this.groups = this.groups.concat(pageableResult.content);
            this.pageableGroups = pageableResult;
            this.toggleInfiniteScroll();

            if (event) {
                event.target.complete();
            }
        });
    }

    toggleInfiniteScroll() {
        this.infiniteScroll.disabled = (this.pager.page >= this.pageableGroups.totalPages)
    }

    selectGroup(group: Group) {
        this.selected.emit(group);
    }

    deleteGroup(group: Group) {
        if (this.deleteAuthorized) {
            this.confirmationService.confirm("Supprimer le groupe \"" + group.name + " \" ?", () => {
                this.groupRest.deleteGroup(group.id).subscribe(() => {
                    removeFromArray(this.groups, group)
                });
            });
        }
    }
}
