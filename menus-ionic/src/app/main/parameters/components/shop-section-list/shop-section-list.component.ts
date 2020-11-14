import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Direction, Order, Pager } from "@models/pager/pager.model";
import { Pageable } from "@models/pager/pageable.model";
import { IonInfiniteScroll } from "@ionic/angular";
import { ConfirmationAlertService } from "@services/confirmation-alert.service";
import { removeFromArray } from "../../../../shared/helpers/remove-array-element.function";
import { ShopSectionRestService } from "@services/shop-section-rest.service";
import { ShopSection } from "@models/shop-section.model";

@Component({
    selector: 'app-shop-section-list',
    templateUrl: './shop-section-list.component.html',
    styleUrls: ['./shop-section-list.component.scss'],
})
export class ShopSectionListComponent implements OnInit {

    sections: ShopSection[] = [];

    private pager: Pager;
    private pageableUnits: Pageable<ShopSection>;

    @Output()
    selected: EventEmitter<ShopSection> = new EventEmitter<ShopSection>();

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
        private shopSectionRest: ShopSectionRestService,
        private confirmationService: ConfirmationAlertService,
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
        this.sections = [];
        this.loadSections(event);
    }

    searchSections(text: string) {
        this.pager.page = 0;
        this.pager.search = text;
        this.sections = [];
        this.loadSections(null);
    }

    scrollSections(event) {
        if (this.pager.page < this.pageableUnits.totalPages) {
            this.pager.page++;
            this.loadSections(event);
        }
        else {
            event.component.disableInfiniteScroll();
        }
    }

    private loadSections(event) {
        this.pager.excludeIds = this.excludeIds;
        this.shopSectionRest.getShopSections(this.pager).subscribe((pageableResult: Pageable<ShopSection>) => {
            this.sections = this.sections.concat(pageableResult.content);
            this.pageableUnits = pageableResult;
            this.toggleInfiniteScroll();

            if (event) {
                event.target.complete();
            }
        });
    }

    toggleInfiniteScroll() {
        this.infiniteScroll.disabled = (this.pager.page >= this.pageableUnits.totalPages)
    }

    selectSection(section: ShopSection) {
        this.selected.emit(section);
    }

    deleteSection(section: ShopSection) {
        this.confirmationService.confirm("Supprimer la section \"" + section.name + "\" ?", () => {
            this.shopSectionRest.deleteShopSection(section).subscribe(() => {
                removeFromArray(this.sections, section)
            });
        });
    }
}
